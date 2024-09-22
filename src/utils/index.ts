import axios, { AxiosError, AxiosResponse } from 'axios';
import { analytics, logEvent } from '../firebase';

// Types
type OpenAIMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

type OpenAIResponse = {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
};

type LoveCalculationResult = {
  finalScore: number;
  advice: string;
  quote: string;
};

type CacheEntry<T> = {
  value: T;
  expiry: number;
};

// Constants
const DEFAULT_MODEL = 'gpt-4o-mini';
const MAX_TOKENS = 250;
const CACHE_TTL = 1000 * 60 * 60; // 1 hour in milliseconds

// Simple in-memory cache
class Cache<T> {
    private cache: Map<string, CacheEntry<T>> = new Map();
    private maxSize: number;
    private lruKeys: string[] = [];
  
    constructor(maxSize: number = 100) {
      this.maxSize = maxSize;
    }
  
    set(key: string, value: T): void {
      if (this.cache.size >= this.maxSize) {
        this.evictOldest();
      }
  
      const expiry = Date.now() + CACHE_TTL;
      this.cache.set(key, { value, expiry });
      this.updateLRU(key);
    }
  
    get(key: string): T | undefined {
      const item = this.cache.get(key);
      if (!item) return undefined;
      if (Date.now() > item.expiry) {
        this.cache.delete(key);
        this.removeLRU(key);
        return undefined;
      }
      this.updateLRU(key);
      return item.value;
    }
  
    clear(): void {
      this.cache.clear();
      this.lruKeys = [];
    }
  
    invalidate(key: string): void {
      this.cache.delete(key);
      this.removeLRU(key);
    }
  
    private evictOldest(): void {
      if (this.lruKeys.length > 0) {
        const oldestKey = this.lruKeys.shift();
        if (oldestKey) this.cache.delete(oldestKey);
      }
    }
  
    private updateLRU(key: string): void {
      this.removeLRU(key);
      this.lruKeys.push(key);
    }
  
    private removeLRU(key: string): void {
      const index = this.lruKeys.indexOf(key);
      if (index > -1) {
        this.lruKeys.splice(index, 1);
      }
    }
  
    size(): number {
      return this.cache.size;
    }
}

// Initialize caches
const openAICache = new Cache<string>();
const compatibilityCache = new Cache<string>();
const loveCalculationCache = new Cache<LoveCalculationResult>();
const zodiacCompatibilityCache = new Cache<string>();

// Utility function for API calls with caching
const makeOpenAIRequest = async (messages: OpenAIMessage[], model: string = DEFAULT_MODEL): Promise<string> => {
  const cacheKey = JSON.stringify({ messages, model });
  const cachedResult = openAICache.get(cacheKey);
  
  if (cachedResult) {
    return cachedResult;
  }

  try {
    const response: AxiosResponse<OpenAIResponse> = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model,
        messages,
        max_tokens: MAX_TOKENS,
      },
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const result = response.data.choices[0].message.content;
    openAICache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error('OpenAI API Error:', axios.isAxiosError(error) ? (error as AxiosError).response?.data : error);
    throw new Error('Failed to get response from OpenAI');
  }
};

// Function to calculate compatibility with caching
const calculateCompatibility = async (date1: string, date2: string): Promise<string> => {
  if (!date1 || !date2) {
    throw new Error('Please select both birthdates');
  }

  const cacheKey = `${date1}|${date2}`;
  const cachedResult = compatibilityCache.get(cacheKey);

  if (cachedResult) {
    return cachedResult;
  }

  logEvent(analytics, 'calculate_compatibility_click', { date1, date2 });

  const messages: OpenAIMessage[] = [
    {
      role: "system",
      content: "You are a love compatibility expert. Provide a brief, fun compatibility analysis based on two birthdates. Include astrological signs and a compatibility percentage."
    },
    {
      role: "user",
      content: `Analyze the love compatibility for people born on ${date1} and ${date2}. Include their astrological signs and a compatibility percentage.`
    }
  ];

  try {
    const result = await makeOpenAIRequest(messages);
    compatibilityCache.set(cacheKey, result);
    logEvent(analytics, 'compatibility_result', { date1, date2, result });
    return result;
  } catch (error) {
    logEvent(analytics, 'compatibility_error', { date1, date2, error: (error as Error).message });
    throw error;
  }
};

// Function to analyze love compatibility
const analyzeLoveCompatibility = async (
  person1: string,
  person2: string,
  loveLanguage1: string,
  loveLanguage2: string,
  percentageScore: number
): Promise<string> => {
  const messages: OpenAIMessage[] = [
    {
      role: "system",
      content: "You are a relationship expert specializing in love compatibility analysis."
    },
    {
      role: "user",
      content: `Analyze the love compatibility between ${person1} (love language: ${loveLanguage1}) and ${person2} (love language: ${loveLanguage2}). Their quiz score is ${percentageScore.toFixed(2)}%. Provide a detailed analysis including:
      1. Overall compatibility assessment
      2. Strengths of their relationship
      3. Areas for improvement
      4. How their love languages interact and complement each other
      5. Personalized tips for strengthening their relationship
      6. A fun "couple nickname" based on their characteristics
      Keep the response engaging, positive, and actionable. Limit the response to about 250 words.`
    }
  ];

  try {
    const result = await makeOpenAIRequest(messages);
    logEvent(analytics, 'quiz_result', { person1, person2, loveLanguage1, loveLanguage2, score: percentageScore, result });
    return result;
  } catch (error) {
    logEvent(analytics, 'quiz_error', { person1, person2, loveLanguage1, loveLanguage2, score: percentageScore, error: (error as Error).message });
    throw error;
  }
};

// Helper functions
const getRelationshipScore = (status: string): number => {
  const scores: { [key: string]: number } = {
    'single': 50,
    'dating': 70,
    'engaged': 85,
    'married': 90,
  };
  return scores[status.toLowerCase()] || 60;
};

const calculateTimeTogetherScore = (time: string): number => {
  const [value, unit] = time.split(' ');
  const numericValue = parseInt(value, 10);
  
  switch (unit.toLowerCase()) {
    case 'day':
    case 'days':
      return Math.min(numericValue * 0.5, 50);
    case 'month':
    case 'months':
      return Math.min(numericValue * 2, 70);
    case 'year':
    case 'years':
      return Math.min(numericValue * 5, 90);
    default:
      return 50;
  }
};

// Function to calculate love score and get advice
const calculateLove = async (
  name1: string,
  name2: string,
  relationshipStatus: string,
  timeTogether: string
): Promise<LoveCalculationResult> => {
  if (!name1.trim() || !name2.trim() || !relationshipStatus) {
    throw new Error('Please fill in all fields');
  }

  const cacheKey = `${name1}|${name2}|${relationshipStatus}|${timeTogether}`;
  const cachedResult = loveCalculationCache.get(cacheKey);

  if (cachedResult) {
    return cachedResult;
  }

  const set1 = new Set(name1.toLowerCase());
  const set2 = new Set(name2.toLowerCase());
  const commonLetters = [...set1].filter(letter => set2.has(letter)).length;
  const lengthFactor = Math.abs(name1.length - name2.length);
  
  const nameScore = (commonLetters * 10) - lengthFactor;
  const relationshipScore = getRelationshipScore(relationshipStatus);
  const timeTogetherScore = calculateTimeTogetherScore(timeTogether);
  
  const baseScore = (nameScore + relationshipScore + timeTogetherScore) / 4;
  const finalScore = Math.max(0, Math.min(100, Math.round(baseScore)));
  
  logEvent(analytics, 'calculate_love_click', { name1, name2, relationshipStatus, timeTogether });

  const messages: OpenAIMessage[] = [
    {
      role: "system",
      content: "You are a relationship advisor. Provide advice and a love quote based on the given love percentage and relationship status."
    },
    {
      role: "user",
      content: `Love percentage: ${finalScore}%. Relationship status: ${relationshipStatus}. Provide brief advice and a short love quote.`
    }
  ];

  try {
    const content = await makeOpenAIRequest(messages);
    const [adviceResponse, quoteResponse] = content.split('\n\n');
    const advice = adviceResponse.replace('Advice: ', '');
    const quote = quoteResponse.replace('Quote: ', '');
    
    const result = { finalScore, advice, quote };
    loveCalculationCache.set(cacheKey, result);
    logEvent(analytics,'love_result', { name1, name2, relationshipStatus, result: finalScore, advice, quote });
    
    return result;
  } catch (error) {
    logEvent(analytics, 'love_calculation_error', { name1, name2, relationshipStatus, error: (error as Error).message });
    return {
      finalScore,
      advice: 'Love is a journey. Enjoy every step!',
      quote: 'Where there is love, there is life. - Mahatma Gandhi'
    };
  }
};

// Function to generate a love poem
const generatePoem = async (
  name1: string,
  name2: string,
  theme: string,
  poemLength: number,
  rhyming: boolean
): Promise<string> => {
  if (!name1 || !name2) {
    throw new Error('Both names are required');
  }

  const messages: OpenAIMessage[] = [
    {
      role: "system",
      content: "You are a romantic poet. Create a beautiful and heartfelt love poem based on the given names, theme, and specifications."
    },
    {
      role: "user",
      content: `Write a love poem for ${name1} and ${name2}. 
      Theme: ${theme}
      Number of stanzas: ${poemLength}
      Rhyming: ${rhyming ? 'Yes' : 'No'}
      Please make sure the poem is personalized, mentioning both names at least once.`
    }
  ];

  try {
    const poem = await makeOpenAIRequest(messages);
    logEvent(analytics, 'poem_generated', { name1, name2, theme, poemLength, rhyming });
    return poem;
  } catch (error) {
    logEvent(analytics, 'poem_generation_error', { name1, name2, theme, poemLength, rhyming, error: (error as Error).message });
    throw error;
  }
};

// Function to calculate soulmate
const calculateSoulmate = async (
  name: string,
  birthdate: string,
  zodiacSign: string,
  interests: string
): Promise<string> => {
  const messages: OpenAIMessage[] = [
    {
      role: "system",
      content: "You are a mystical soulmate predictor. Provide a comprehensive description of someone's soulmate based on their name, birthdate, zodiac sign, and interests."
    },
    {
      role: "user",
      content: `Describe the soulmate for a person named ${name}, born on ${birthdate}, with the zodiac sign ${zodiacSign} and interests in ${interests}.`
    }
  ];

  logEvent(analytics, 'calculate_soulmate_click', { name, birthdate, zodiacSign, interests });

  try {
    const result = await makeOpenAIRequest(messages);
    logEvent(analytics, 'soulmate_result', { name, birthdate, zodiacSign, interests, result });
    return result;
  } catch (error) {
    logEvent(analytics, 'soulmate_calculation_error', { name, birthdate, zodiacSign, interests, error: (error as Error).message });
    throw error;
  }
};

// Function to calculate zodiac compatibility
const calculateZodiacCompatibility = async (sign1: string, sign2: string): Promise<string> => {
  if (!sign1 || !sign2) {
    throw new Error('Please select both zodiac signs');
  }

  const cacheKey = `${sign1}|${sign2}`;
  const cachedResult = zodiacCompatibilityCache.get(cacheKey);

  if (cachedResult) {
    return cachedResult;
  }

  const score = Math.floor(Math.random() * 101);
  logEvent(analytics, 'calculate_zodiac_compatibility_click', { sign1, sign2 });

  const messages: OpenAIMessage[] = [
    {
      role: "system",
      content: "You are an expert astrologer specializing in zodiac compatibility."
    },
    {
      role: "user",
      content: `Provide a brief, fun explanation of the love compatibility between ${sign1} and ${sign2}. Their compatibility score is ${score}%.`
    }
  ];

  try {
    const text = await makeOpenAIRequest(messages);
    const result = `Compatibility: ${score}%\n\n${text}`;
    zodiacCompatibilityCache.set(cacheKey, result);
    logEvent(analytics, 'zodiac_compatibility_result', { sign1, sign2, score, result: text });
    return result;
  } catch (error) {
    logEvent(analytics, 'zodiac_compatibility_error', { sign1, sign2, error: (error as Error).message });
    throw error;
  }
};

// Function to manually invalidate cache
const invalidateCache = (cacheType: string, key: string): void => {
  switch (cacheType) {
    case 'openAI':
      openAICache.invalidate(key);
      break;
    case 'compatibility':
      compatibilityCache.invalidate(key);
      break;
    case 'loveCalculation':
      loveCalculationCache.invalidate(key);
      break;
    case 'zodiacCompatibility':
      zodiacCompatibilityCache.invalidate(key);
      break;
    default:
      console.error(`Unknown cache type: ${cacheType}`);
  }
};

export {
  calculateCompatibility,
  analyzeLoveCompatibility,
  calculateLove,
  generatePoem,
  calculateSoulmate,
  calculateZodiacCompatibility,
  invalidateCache
};
