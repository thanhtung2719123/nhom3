import React, { useState, useCallback } from 'react';

// --- INLINE SVG ICONS ---
// Replaced lucide-react imports with inline SVGs for compatibility.

const Shield = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const Sparkles = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.9 1.9-1.1-3-1.9 1.9-3-1.1 1.9 1.9-1.1 3 1.9-1.9 3 1.1-1.9-1.9 1.1-3Z"></path>
    <path d="M22 12l-1.9-1.9-3 1.1 1.9 1.9-1.1 3 1.9-1.9 1.1 3 1.9-1.9-3-1.1Z"></path>
    <path d="m5 22 1.9-1.9 1.1 3 1.9-1.9 3 1.1-1.9-1.9 1.1-3-1.9 1.9-3-1.1Z"></path>
  </svg>
);

const AlertTriangle = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
    <path d="M12 9v4"></path><path d="M12 17h.01"></path>
  </svg>
);

const MessageSquare = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const BookOpen = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const Loader = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
    <line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
  </svg>
);

// --- MODEL & API CONFIG ---
const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;
const apiKey = "AIzaSyCkTDvFKxr18HDzUXqjSLCdB5F9sfPzaGI";

// --- System Instruction for the AI Risk Analyst ---
const systemInstruction = `You are a professional financial risk analyst. Your goal is to assess the user's preparedness for six major personal risks: Disability, Illness, Death, Retirement, Property Loss, and Liability, based on the financial and insurance concepts of risk management. Analyze the user's natural language input thoroughly to infer their status across these six risk categories. Generate a response that MUST include: 1. A clear header: **Overall Risk Preparedness Rating: [Poor, Fair, Good, or Excellent]** 2. A detailed, bulleted summary of the assessment for each of the six risk categories, assigning a simple status (Prepared, Moderate Risk, or High Risk) for each. 3. Specific, actionable recommendations (1-2 sentences per recommendation) to address the identified weak areas. Strictly use clean, readable markdown formatting for the response. Do not use any introductory or concluding conversational phrases, just the analysis. The response must be comprehensive.`;

// --- Academic Definitions Component ---
const AcademicDefinitions = () => (
    <div className="p-6 bg-gray-800 rounded-2xl shadow-xl text-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-indigo-300 flex items-center">
            <BookOpen className="w-6 h-6 mr-2" />
            Group Work: Personal Risk Management Definitions
        </h2>
        <p className="mb-6 text-gray-400">
            *This table defines the major personal risks and strategies for reducing their financial impact.*
        </p>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700 rounded-lg overflow-hidden">
                <thead className="bg-gray-700">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Personal Events</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Financial Impact</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Personal Strategies / Resources</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Private Sector Support</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Public Sector Support</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {AcademicData.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-700 transition duration-150">
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-indigo-300">{row.risk}</td>
                            <td className="px-4 py-3 text-sm">{row.impact}</td>
                            <td className="px-4 py-3 text-sm">{row.personalStrategies}</td>
                            <td className="px-4 py-3 text-sm">{row.privateSectorSupport}</td>
                            <td className="px-4 py-3 text-sm">{row.publicSectorSupport}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

// UPDATED: Data structure now reflects the table provided in the image.
const AcademicData = [
    { 
        risk: 'Disability', 
        impact: 'Income may stop; additional medical or caregiving expenses arise', 
        personalStrategies: 'Build savings, diversify investments, maintain health and workplace safety', 
        privateSectorSupport: 'Purchase disability insurance to replace lost income', 
        publicSectorSupport: 'Government disability benefits or social welfare programs' 
    },
    { 
        risk: 'Illness', 
        impact: 'Medical bills can be very high; reduced ability to work', 
        personalStrategies: 'Adopt healthy lifestyles and preventive care', 
        privateSectorSupport: 'Health insurance or medical plans from private companies', 
        publicSectorSupport: 'National healthcare services or public insurance programs (e.g., Medicare, Medicaid)' 
    },
    { 
        risk: 'Death', 
        impact: 'Family loses financial support; funeral and legal expenses occur', 
        personalStrategies: 'Create a will or estate plan, manage risks early', 
        privateSectorSupport: 'Obtain life insurance to protect dependents', 
        publicSectorSupport: 'Survivor\'s benefits and state-provided life insurance for certain occupations' 
    },
    { 
        risk: 'Retirement', 
        impact: 'Decline in regular income; unexpected living or medical costs', 
        personalStrategies: 'Save regularly, invest wisely, develop skills or hobbies that generate income', 
        privateSectorSupport: 'Join private pension or retirement saving programs', 
        publicSectorSupport: 'Government pensions and Social Security for retirees' 
    },
    { 
        risk: 'Property loss', 
        impact: 'Financial loss from accidents, theft, or natural disasters', 
        personalStrategies: 'Maintain property, install security systems, and make emergency plans', 
        privateSectorSupport: 'Buy homeowner\'s or car insurance to cover damage and loss', 
        publicSectorSupport: 'Public disaster-relief or joint flood insurance programs' 
    },
    { 
        risk: 'Liability', 
        impact: 'Paying compensation or legal fees due to accidents or negligence', 
        personalStrategies: 'Follow safety standards, keep assets protected, and act responsibly', 
        privateSectorSupport: 'Use liability or malpractice insurance for protection', 
        publicSectorSupport: 'Public legal aid or regulatory protections in some cases' 
    },
];


// --- AI Assessment Component Functions ---
const RiskAssessmentDisplay = ({ content, isLoading, isError }) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64 bg-gray-800 rounded-2xl">
                <Loader className="animate-spin w-8 h-8 mr-3 text-indigo-400" />
                <span className="text-xl text-gray-300">Analyzing Your Financial Profile...</span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6 bg-red-800 text-white rounded-xl flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3" />
                An error occurred while generating the report. Please try again.
            </div>
        );
    }

    if (!content) return null;

    const getRatingStyle = (rating) => {
        if (!rating) return 'bg-gray-600';
        const lowerRating = rating.toLowerCase();
        if (lowerRating.includes('excellent')) return 'bg-green-600';
        if (lowerRating.includes('good')) return 'bg-blue-600';
        if (lowerRating.includes('fair')) return 'bg-yellow-600 text-gray-900';
        return 'bg-red-600';
    };

    const ratingMatch = content.match(/\*\*Overall Risk Preparedness Rating:\s*(.*?)\*\*/i);
    const rating = ratingMatch ? ratingMatch[1].trim() : 'Unrated';
    let displayContent = content;
    if (ratingMatch) {
        displayContent = content.replace(ratingMatch[0], '').trim();
    }
    const ratingClass = getRatingStyle(rating);

    const formatMarkdown = (markdown) => {
        let inList = false;
        const lines = markdown.split('\n');
        let html = lines.map(line => {
            line = line.trim()
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

            if (line.startsWith('* ')) {
                if (!inList) {
                    inList = true;
                    return '<ul><li class="list-disc ml-5">' + line.substring(2) + '</li>';
                }
                return '<li class="list-disc ml-5">' + line.substring(2) + '</li>';
            } else {
                if (inList) {
                    inList = false;
                    return '</ul><p class="mt-4">' + line + '</p>';
                }
                return line ? '<p class="mt-2">' + line + '</p>' : '';
            }
        }).join('');

        if (inList) {
            html += '</ul>';
        }
        return html;
    };


    return (
        <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-700">
            <div className={`p-4 rounded-xl mb-4 text-white text-lg font-bold text-center ${ratingClass}`}>
                <Sparkles className="inline w-6 h-6 mr-2" />
                Overall Rating: {rating}
            </div>
            <div className="markdown-content text-gray-300 space-y-4" dangerouslySetInnerHTML={{ __html: formatMarkdown(displayContent) }} />
        </div>
    );
};


function App() {
    const [userInput, setUserInput] = useState('');
    const [assessment, setAssessment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('academic');

    const getAssessment = useCallback(async () => {
        if (userInput.trim() === '') {
            setError("Please describe your financial situation to get an assessment.");
            return;
        }

        setLoading(true);
        setError(null);
        setAssessment(null);
        setActiveTab('ai_report');

        const userQuery = `Analyze this user's current financial profile... USER INPUT: "${userInput.trim()}"`;

        const payload = {
            contents: [{ parts: [{ text: userQuery }] }],
            systemInstruction: { parts: [{ text: systemInstruction }] },
            generationConfig: {
                temperature: 0.2,
            },
        };

        const fetchWithBackoff = async (attempt = 0) => {
            const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
            if (attempt > 0) await new Promise(resolve => setTimeout(resolve, delay));
            
            const apiUrlWithKey = `${API_URL}?key=${apiKey}`;

            try {
                const response = await fetch(apiUrlWithKey, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    const errorBody = await response.json();
                    console.error("API Error:", errorBody);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;

                if (generatedText) {
                    setAssessment(generatedText);
                    setLoading(false);
                } else {
                    throw new Error('Received an empty response from the AI model.');
                }
            } catch (e) {
                console.error(`Attempt ${attempt + 1} failed:`, e);
                if (attempt < 3) {
                    await fetchWithBackoff(attempt + 1);
                } else {
                    setError('Failed to get a risk assessment after multiple retries.');
                    setLoading(false);
                    setActiveTab('ai_input');
                }
            }
        };

        fetchWithBackoff();

    }, [userInput]);


    const renderTabContent = () => {
        if (activeTab === 'academic') {
            return <AcademicDefinitions />;
        }

        if (activeTab === 'ai_input') {
            return (
                <div className="p-6 bg-gray-800 rounded-2xl shadow-xl">
                    <h2 className="text-2xl font-semibold text-indigo-300 pb-2">1. Describe Your Financial Situation</h2>
                    <p className="text-gray-400 mb-4">
                        The AI needs details to analyze your risk. Tell me about your <strong>income, savings, debts, insurance coverage (health, auto, home), retirement plan, and dependents.</strong>
                    </p>
                    <textarea
                        className="w-full h-48 p-4 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition duration-150 ease-in-out"
                        placeholder="Example: I'm 28, earning $50k/year. I have $5k in savings, $10k in student loans, a 401k with a 5% match, good health insurance, and auto insurance. No life insurance yet, no dependents."
                        value={userInput}
                        onChange={(e) => {
                            setUserInput(e.target.value);
                            setError(null);
                        }}
                    />
                    {error && (
                        <div className="p-3 mt-4 bg-red-800 text-white text-sm rounded-lg flex items-center">
                            <AlertTriangle className="w-5 h-5 mr-2" />
                            {error}
                        </div>
                    )}
                    <button
                        onClick={getAssessment}
                        disabled={loading || userInput.trim() === ''}
                        className={`mt-6 w-full py-4 text-lg font-bold rounded-xl shadow-md transition duration-300 ease-in-out text-white ${loading || userInput.trim() === '' ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/50'}`}
                    >
                        <span className="flex items-center justify-center">
                            <Sparkles className="w-5 h-5 mr-3" />
                            Analyze My Risk Profile
                        </span>
                    </button>
                </div>
            );
        } else if (activeTab === 'ai_report') {
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-indigo-300 pb-2">2. Your Personalized AI Risk Report</h2>
                    <RiskAssessmentDisplay content={assessment} isLoading={loading} isError={!!error} />
                </div>
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-8">
            <script src="https://cdn.tailwindcss.com"></script>
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-400 tracking-tight">
                        <Shield className="inline w-8 h-8 mr-2 -mt-1" />
                        Integrated Financial Risk Analyst
                    </h1>
                    <p className="mt-3 text-lg text-gray-400">
                        Academic definitions and conversational risk assessment in one place.
                    </p>
                </header>

                <main className="space-y-12">
                    <div className="flex border-b border-gray-700 mb-6">
                        <button
                            onClick={() => setActiveTab('academic')}
                            className={`px-4 py-2 font-medium text-lg rounded-t-lg transition-colors duration-200 flex items-center ${activeTab === 'academic' ? 'bg-gray-800 text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:bg-gray-700/50'}`}
                        >
                            <BookOpen className="w-5 h-5 mr-2" />
                            Academic Definitions
                        </button>
                        <button
                            onClick={() => setActiveTab('ai_input')}
                            className={`px-4 py-2 font-medium text-lg rounded-t-lg transition-colors duration-200 flex items-center ${activeTab === 'ai_input' || activeTab === 'ai_report' ? 'bg-gray-800 text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:bg-gray-700/50'}`}
                        >
                            <MessageSquare className="w-5 h-5 mr-2" />
                            AI Risk Assessor
                        </button>
                    </div>
                    
                    {renderTabContent()}
                </main>

                <footer className="mt-12 text-center text-sm text-gray-500 pt-8 border-t border-gray-700">
                    *Academic data is based on provided course materials.
                    <div className="mt-2">AI Model used: {MODEL_NAME}</div>
                </footer>
            </div>
        </div>
    );
}

export default App;
