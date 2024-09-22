import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, RefreshCcw, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { ToastProvider } from './ui/toast';
import { useToast } from '../hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { openai } from '../api/openai';
import { NameInput } from './NameInput';
import { GiHeartBeats } from 'react-icons/gi';

const LovePoemGenerator = () => {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [poem, setPoem] = useState('');
    const [loading, setLoading] = useState(false);
    const [poemLength, setPoemLength] = useState(4);
    const [rhyming, setRhyming] = useState(true);
    const [theme, setTheme] = useState('romance');
    const [copied, setCopied] = useState(false);
    const { toast } = useToast();

    const themes = ['romance', 'nature', 'cosmic', 'fantasy', 'adventure', 'mystery'];

    const generatePoem = useCallback(async () => {
        if (!name1 || !name2) return;
        
        setLoading(true);
        setCopied(false);
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: `You are a romantic poet. Create a beautiful and heartfelt love poem based on the given names, theme, and specifications.`
                    },
                    {
                        role: "user",
                        content: `Write a love poem for ${name1} and ${name2}. 
                        Theme: ${theme}
                        Number of stanzas: ${poemLength}
                        Rhyming: ${rhyming ? 'Yes' : 'No'}
                        Please make sure the poem is personalized, mentioning both names at least once.`
                    }
                ],
            });

            setPoem(response.choices[0].message.content || '');
        } catch (error) {
            console.error('Error generating poem:', error);
            setPoem('Oops! Something went wrong while generating the poem. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [name1, name2, poemLength, rhyming, theme]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(poem);
        setCopied(true);
        toast({
            title: "Copied!",
            description: "Poem copied to clipboard!",
        });
        setTimeout(() => setCopied(false), 3000); // Reset copied state after 3 seconds
    };

    return (
        <div className="min-h-screen py-24 bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl backdrop-blur-md bg-white/10 border-none shadow-xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-4xl font-bold text-white flex items-center justify-center">
                        <Heart className="mr-2 text-red-200" />
                        Love Poem Generator
                        <Sparkles className="ml-2 text-yellow-400" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center justify-evenly space-x-4 mb-12">
                            <NameInput placeholder="Enter your name" value={name1} onChange={setName1} icon={<GiHeartBeats className='text-white w-full' />} />
                            <NameInput placeholder="Enter their name" value={name2} onChange={setName2} icon={<GiHeartBeats className='text-white w-full' />} />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="text-white">Poem Length: {poemLength} stanzas</label>
                            <Slider
                                min={2}
                                max={5}
                                step={1}
                                value={[poemLength]}
                                onValueChange={(value) => setPoemLength(value[0])}
                                className="w-1/2 bg-purple-300"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="text-white">Rhyming</label>
                            <Switch
                                checked={rhyming}
                                onCheckedChange={setRhyming}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="text-white">Theme</label>
                            <Select value={theme} onValueChange={setTheme}>
                                <SelectTrigger className="w-[180px] bg-white/20 border-none text-white">
                                    <SelectValue placeholder="Select a theme" />
                                </SelectTrigger>
                                <SelectContent className="bg-white/90 cursor-pointer text-purple-700">
                                    {themes.map((t) => (
                                        <SelectItem key={t} value={t} className="cursor-pointer">
                                            {t.charAt(0).toUpperCase() + t.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button
                            onClick={generatePoem}
                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                            disabled={loading || !name1 || !name2}
                        >
                            {loading ? (
                                <RefreshCcw className="animate-spin" />
                            ) : (
                                'Generate Poem'
                            )}
                        </Button>
                    </motion.div>
                    <AnimatePresence>
                        {poem && (
                            <motion.div
                                key="poem"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                                className="mt-6"
                            >
                                <Card className="bg-white/30 border-none relative">
                                    <CardContent className="p-4">
                                        <p className="text-white text-lg font-serif whitespace-pre-line">{poem}</p>
                                        <Button
                                            onClick={copyToClipboard}
                                            className="absolute top-2 right-2 bg-white/50 hover:bg-white/70 text-purple-700"
                                        >
                                            {copied ? <Check /> : <Copy />}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
    );
};

const WrappedLovePoemGenerator = () => (
    <ToastProvider>
        <LovePoemGenerator />
    </ToastProvider>
);

export default WrappedLovePoemGenerator;
