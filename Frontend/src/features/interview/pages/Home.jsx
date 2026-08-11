import React, { useEffect, useRef, useState } from 'react';
import { useInterview } from '../hooks/InterviewHook';
import { useNavigate } from 'react-router';

import {
    Sparkles,
    FileText,
    BriefcaseBusiness,
    UserRound,
    UploadCloud,
    ArrowRight,
    Clock3,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    X,
    History,
    Target,
    CheckCircle2,
    WandSparkles,
    ShieldCheck,
    Brain,
} from 'lucide-react';


const Home = () => {

    const {
        loading,
        generateReport,
        reports,
        getReports,
    } = useInterview();

    const [jobDescription, setJobDescription] = useState('');
    const [selfDescription, setSelfDescription] = useState('');
    const [selectedFileName, setSelectedFileName] = useState('');

    const [isPlansOpen, setIsPlansOpen] = useState(true);
    const [isMobilePlansOpen, setIsMobilePlansOpen] = useState(false);

    const resumeInputRef = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        getReports();
    }, []);

    const handleFileChange = (e) => {

        const file = e.target.files?.[0];

        if (file) {
            setSelectedFileName(file.name);
        }

    };

    const handleGenerateReport = async (e) => {

        e.preventDefault();

        const resumeFile =
            resumeInputRef.current?.files?.[0];

        try {

            const data = await generateReport({
                jobDescription,
                selfDescription,
                resumeFile,
            });

            if (data?._id) {
                navigate(`/interview/${data._id}`);
            }

        } catch (err) {

            console.error(
                'Failed to generate report',
                err
            );

        }

    };

    const getScoreConfig = (score) => {

        if (score >= 80) {

            return {
                bg: 'bg-emerald-50',
                text: 'text-emerald-600',
                border: 'border-emerald-100',
                dot: 'bg-emerald-500',
            };

        }

        if (score >= 60) {

            return {
                bg: 'bg-amber-50',
                text: 'text-amber-600',
                border: 'border-amber-100',
                dot: 'bg-amber-500',
            };

        }

        return {
            bg: 'bg-rose-50',
            text: 'text-rose-600',
            border: 'border-rose-100',
            dot: 'bg-rose-500',
        };
    };
    if (loading) {
        return (
            <main className="h-screen w-full bg-[#f7f8fc] flex items-center justify-center p-4">
                <div className="flex flex-col items-center text-center">
                    <div className="relative w-14 h-14 mb-5">
                        <div className="absolute inset-0 rounded-2xl bg-indigo-100 animate-pulse" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-indigo-600 animate-pulse" />
                        </div>
                    </div>
                    <h1 className="text-lg sm:text-xl font-extrabold text-slate-800">
                        Building your interview strategy...
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
                        Our AI is analyzing your resume and target role.
                    </p>
                    <div className="w-40 h-1 bg-slate-200 rounded-full overflow-hidden mt-5">

                        <div className="h-full w-1/2 bg-indigo-500 rounded-full animate-[pulse_1.2s_ease-in-out_infinite]" />

                    </div>
                </div>
            </main>
        );
    }

    return (
        <div className="h-screen w-full bg-[#f7f8fc] text-slate-800 font-sans overflow-hidden">

            <div className="h-full w-full p-3 sm:p-4 lg:p-5">

                <div className="relative h-full max-w-[1550px] mx-auto bg-white border border-slate-200/80 rounded-3xl shadow-[0_12px_45px_rgba(15,23,42,0.05)] overflow-hidden">

                    <header className="absolute top-0 left-0 right-0 z-30 h-18 bg-white/95 backdrop-blur border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">

                        <div className="flex items-center gap-3 min-w-0">

                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">

                                <Sparkles className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-indigo-600" />

                            </div>

                            <div className="min-w-0">

                                <h1 className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                                    AI Career Interview Studio
                                </h1>
                                <p className="hidden sm:block text-[10px] text-slate-400">
                                    Resume intelligence • Interview preparation
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() =>
                                setIsPlansOpen(
                                    !isPlansOpen
                                )
                            }
                            className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-100 text-slate-600 hover:text-indigo-600 transition"
                        >

                            <History className="w-4 h-4" />

                            <span className="text-xs font-bold">
                                Recent Plans
                            </span>


                            <span className="min-w-5 h-5 px-1 rounded-md bg-white border border-slate-200 text-[9px] font-extrabold flex items-center justify-center">

                                {reports?.length || 0}

                            </span>


                            {isPlansOpen ? (
                                <ChevronRight className="w-3.5 h-3.5" />
                            ) : (
                                <ChevronLeft className="w-3.5 h-3.5" />
                            )}

                        </button>

                        <button
                            onClick={() =>
                                setIsMobilePlansOpen(
                                    true
                                )
                            }
                            className="lg:hidden flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600"
                        >

                            <History className="w-4 h-4" />

                            <span className="hidden sm:inline text-xs font-bold">
                                Plans
                            </span>


                            <span className="text-[9px] font-extrabold">

                                {reports?.length || 0}

                            </span>

                        </button>

                    </header>

                    <div className="absolute inset-0 top-18 flex overflow-hidden">

                        <main
                            className={`h-full overflow-y-auto transition-all duration-300 ease-in-out ${
                                isPlansOpen
                                    ? 'w-full lg:w-[calc(100%-320px)]'
                                    : 'w-full'
                            }`}
                        >

                            <div
                                className={`min-h-full flex flex-col justify-center px-4 py-8 sm:px-8 sm:py-10 lg:px-10 xl:px-14 transition-all duration-300 ${
                                    isPlansOpen
                                        ? 'max-w-225 mx-auto'
                                        : 'max-w-225 mx-auto'
                                }`}
                            >

                                <section className="text-center mb-7 sm:mb-9">

                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 mb-4">

                                        <WandSparkles className="w-3.5 h-3.5" />

                                        <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider">

                                            AI-Powered Career Preparation

                                        </span>

                                    </div>

                                    <h2 className="text-3xl sm:text-4xl lg:text-[44px] leading-[1.08] font-black tracking-tight text-slate-900">

                                        Turn Your Resume Into

                                        <span className="block text-indigo-600 mt-1">

                                            Your Interview Advantage.

                                        </span>

                                    </h2>


                                    <p className="max-w-2xl mx-auto mt-4 text-sm sm:text-base text-slate-500 leading-relaxed">

                                        Upload your resume, describe your
                                        experience, and share the job you're
                                        targeting. We'll transform it into a
                                        personalized interview preparation
                                        strategy.

                                    </p>

                                    <div className="flex flex-wrap justify-center gap-2.5 sm:gap-4 mt-5">

                                        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400">

                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />

                                            Resume analysis

                                        </div>


                                        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400">

                                            <Target className="w-3.5 h-3.5 text-indigo-500" />

                                            Job matching

                                        </div>


                                        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400">

                                            <Brain className="w-3.5 h-3.5 text-violet-500" />

                                            AI interview prep

                                        </div>

                                    </div>

                                </section>

                                <section className="bg-white border border-slate-200 rounded-[22px] shadow-[0_8px_35px_rgba(15,23,42,0.06)] overflow-hidden">

                                    <div className="px-5 sm:px-6 py-4 sm:py-5 bg-linear-to-r from-indigo-50/70 to-white border-b border-slate-200">

                                        <div className="flex items-center gap-3">

                                            <div className="w-9 h-9 rounded-xl bg-white border border-indigo-100 flex items-center justify-center shadow-sm">

                                                <FileText className="w-4 h-4 text-indigo-600" />

                                            </div>

                                            <div>
                                                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                                                    Build Your Interview Plan
                                                </h3>
                                                <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">
                                                    Three inputs. One personalized
                                                    preparation strategy.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <form
                                        onSubmit={
                                            handleGenerateReport
                                        }
                                        className="p-5 sm:p-6 space-y-5"
                                    >

                                        <div className="space-y-2">

                                            <label
                                                htmlFor="selfDescription"
                                                className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700"
                                            >

                                                <UserRound className="w-4 h-4 text-indigo-500" />

                                                About You

                                                <span className="text-[10px] font-medium text-slate-400">
                                                    Your experience & skills
                                                </span>

                                            </label>


                                            <textarea
                                                id="selfDescription"
                                                name="selfDescription"
                                                rows="4"
                                                value={
                                                    selfDescription
                                                }
                                                onChange={(e) =>
                                                    setSelfDescription(
                                                        e.target
                                                            .value
                                                    )
                                                }
                                                placeholder="Tell us about your skills, experience, projects, achievements, and career goals..."
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 focus:bg-white transition"
                                            />

                                        </div>

                                        <div className="space-y-2">

                                            <label
                                                htmlFor="jobDescription"
                                                className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700"
                                            >

                                                <BriefcaseBusiness className="w-4 h-4 text-violet-500" />

                                                Target Job

                                                <span className="text-[10px] font-medium text-slate-400">
                                                    What you're applying for
                                                </span>

                                            </label>


                                            <textarea
                                                id="jobDescription"
                                                name="jobDescription"
                                                rows="5"
                                                value={
                                                    jobDescription
                                                }
                                                onChange={(e) =>
                                                    setJobDescription(
                                                        e.target
                                                            .value
                                                    )
                                                }
                                                placeholder="Paste the job description, responsibilities, required skills, qualifications, or role overview..."
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 focus:bg-white transition"
                                            />

                                        </div>

                                        <div className="space-y-2">

                                            <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700">

                                                <FileText className="w-4 h-4 text-emerald-500" />

                                                Your Resume

                                                <span className="text-[10px] font-medium text-slate-400">
                                                    PDF format
                                                </span>

                                            </label>


                                            <div className="relative">

                                                <input
                                                    ref={
                                                        resumeInputRef
                                                    }
                                                    type="file"
                                                    id="resume"
                                                    name="resume"
                                                    accept=".pdf"
                                                    onChange={
                                                        handleFileChange
                                                    }
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />


                                                <div className={`border-2 border-dashed rounded-2xl p-5 sm:p-6 text-center transition ${
                                                    selectedFileName
                                                        ? 'border-emerald-200 bg-emerald-50/50'
                                                        : 'border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/30'
                                                }`}>

                                                    <div className="flex flex-col items-center">


                                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-2.5 ${
                                                            selectedFileName
                                                                ? 'bg-emerald-100'
                                                                : 'bg-white border border-slate-200'
                                                        }`}>

                                                            {selectedFileName ? (

                                                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />

                                                            ) : (

                                                                <UploadCloud className="w-5 h-5 text-indigo-500" />

                                                            )}

                                                        </div>


                                                        <p className="text-xs sm:text-sm font-bold text-slate-700 break-all px-2">

                                                            {selectedFileName ? (
                                                                <span className="text-emerald-600">
                                                                    {selectedFileName}
                                                                </span>
                                                            ) : (
                                                                'Drop your resume here or click to browse'
                                                            )}

                                                        </p>


                                                        <p className="text-[10px] text-slate-400 mt-1">

                                                            PDF only • Maximum
                                                            10MB

                                                        </p>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        <button
                                            type="submit"
                                            className="group w-full flex items-center justify-center gap-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold py-3.5 px-5 rounded-xl shadow-lg shadow-indigo-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                        >

                                            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />

                                            Generate My Interview Plan

                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />

                                        </button>


                                        <p className="flex items-center justify-center gap-1.5 text-[9px] sm:text-[10px] text-slate-400">

                                            <ShieldCheck className="w-3 h-3 text-emerald-500" />

                                            Your information is used only to
                                            personalize your report.

                                        </p>

                                    </form>

                                </section>

                                <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mt-5">

                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-center sm:text-left">

                                        <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">

                                            <Target className="w-3.5 h-3.5 text-indigo-600" />

                                        </div>

                                        <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400">
                                            Smart Matching
                                        </span>

                                    </div>


                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-center sm:text-left">

                                        <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center">

                                            <Brain className="w-3.5 h-3.5 text-violet-600" />

                                        </div>

                                        <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400">
                                            AI Questions
                                        </span>

                                    </div>


                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-center sm:text-left">

                                        <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">

                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />

                                        </div>

                                        <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400">
                                            Action Plan
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </main>

                        <aside
                            className={`hidden lg:flex h-full shrink-0 bg-[#fafaff] border-l border-slate-200 flex-col transition-all duration-300 ease-in-out ${
                                isPlansOpen
                                    ? 'w-[320px]'
                                    : 'w-0 overflow-hidden border-l-0'
                            }`}
                        >

                            {isPlansOpen && (

                                <div className="w-[320px] h-full flex flex-col">

                                    <div className="shrink-0 px-4 py-4 border-b border-slate-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                                                    <History className="w-4 h-4 text-indigo-600" />
                                                </div>
                                                <div>
                                                    <h2 className="text-sm font-extrabold text-slate-900">
                                                        Recent Plans
                                                    </h2>
                                                    <p className="text-[10px] text-slate-400">
                                                        Your generated reports
                                                    </p>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() =>
                                                    setIsPlansOpen(
                                                        false
                                                    )
                                                }
                                                className="w-7 h-7 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition"
                                            >

                                                <ChevronRight className="w-4 h-4" />

                                            </button>

                                        </div>

                                        <div className="mt-3 flex items-center justify-between bg-white border border-slate-200 rounded-xl px-3 py-2">

                                            <span className="text-[10px] font-semibold text-slate-500">
                                                Saved interview plans
                                            </span>


                                            <span className="text-xs font-black text-indigo-600">

                                                {reports?.length || 0}

                                            </span>

                                        </div>

                                    </div>


                                    {/* REPORT LIST */}

                                    <div className="flex-1 min-h-0 overflow-y-auto p-3">

                                        {!reports ||
                                        reports.length === 0 ? (

                                            <div className="h-full flex flex-col items-center justify-center text-center px-5">

                                                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">

                                                    <History className="w-5 h-5 text-slate-400" />

                                                </div>


                                                <h3 className="text-xs font-bold text-slate-700">

                                                    No plans yet

                                                </h3>


                                                <p className="text-[10px] text-slate-400 leading-relaxed mt-1.5">

                                                    Generate your first interview
                                                    plan and it will appear here.

                                                </p>

                                            </div>

                                        ) : (

                                            <div className="space-y-2.5">

                                                {reports.map(
                                                    (report) => {

                                                        const score =
                                                            report.matchScore ||
                                                            0;

                                                        const config =
                                                            getScoreConfig(
                                                                score
                                                            );


                                                        return (

                                                            <button
                                                                key={
                                                                    report._id
                                                                }
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/interview/${report._id}`
                                                                    )
                                                                }
                                                                className="w-full group text-left bg-white border border-slate-200 hover:border-indigo-200 hover:shadow-sm rounded-xl p-3 transition-all duration-200"
                                                            >

                                                                <div className="flex items-start gap-2.5">

                                                                    {/* ICON */}

                                                                    <div className="w-8 h-8 shrink-0 rounded-lg bg-indigo-50 flex items-center justify-center">

                                                                        <BriefcaseBusiness className="w-3.5 h-3.5 text-indigo-600" />

                                                                    </div>


                                                                    {/* CONTENT */}

                                                                    <div className="flex-1 min-w-0">

                                                                        <div className="flex items-start justify-between gap-2">

                                                                            <h3 className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors truncate">

                                                                                {
                                                                                    report.title ||
                                                                                    'Untitled Position'
                                                                                }

                                                                            </h3>


                                                                            <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all shrink-0" />

                                                                        </div>


                                                                        <div className="flex items-center gap-1.5 mt-1">

                                                                            <Clock3 className="w-3 h-3 text-slate-300" />

                                                                            <span className="text-[9px] text-slate-400">

                                                                                {new Date(
                                                                                    report.createdAt
                                                                                ).toLocaleDateString(
                                                                                    undefined,
                                                                                    {
                                                                                        month: 'short',
                                                                                        day: 'numeric',
                                                                                        year: 'numeric',
                                                                                    }
                                                                                )}

                                                                            </span>

                                                                        </div>


                                                                        {/* SCORE */}

                                                                        <div className="mt-2.5 flex items-center justify-between">

                                                                            <div className="flex items-center gap-1.5">

                                                                                <span
                                                                                    className={`w-1.5 h-1.5 rounded-full ${config.dot}`}
                                                                                />

                                                                                <span className="text-[9px] font-semibold text-slate-400">
                                                                                    Match
                                                                                </span>

                                                                            </div>


                                                                            <span
                                                                                className={`text-[9px] font-extrabold px-1.5 py-1 rounded-md border ${config.bg} ${config.text} ${config.border}`}
                                                                            >

                                                                                {
                                                                                    score
                                                                                }
                                                                                %

                                                                            </span>

                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </button>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        )}

                                    </div>


                                    {/* SIDEBAR FOOTER */}

                                    <div className="shrink-0 p-3 border-t border-slate-200">

                                        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3">

                                            <div className="flex items-start gap-2">

                                                <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />

                                                <p className="text-[9px] text-indigo-700 leading-relaxed">

                                                    Your latest reports are saved
                                                    automatically for quick access.

                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            )}

                        </aside>

                    </div>

                    {!isPlansOpen && (

                        <button
                            onClick={() =>
                                setIsPlansOpen(true)
                            }
                            className="hidden lg:flex absolute right-4 top-22 z-40 items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-500 hover:text-indigo-600 hover:border-indigo-100 transition"
                        >

                            <History className="w-4 h-4" />

                            <span className="text-xs font-bold">
                                Recent Plans
                            </span>

                            <span className="text-[9px] font-black bg-indigo-50 text-indigo-600 px-1.5 py-1 rounded-md">

                                {reports?.length || 0}

                            </span>


                            <ChevronLeft className="w-3.5 h-3.5" />

                        </button>

                    )}

                    {isMobilePlansOpen && (

                        <div
                            onClick={() =>
                                setIsMobilePlansOpen(
                                    false
                                )
                            }
                            className="lg:hidden absolute inset-0 z-40 bg-slate-900/20 backdrop-blur-[2px]"
                        />

                    )}

                    <aside
                        className={`lg:hidden absolute top-0 right-0 bottom-0 z-50 w-[min(88%,340px)] bg-[#fafaff] border-l border-slate-200 shadow-[-12px_0_40px_rgba(15,23,42,0.12)] transition-transform duration-300 ease-out ${
                            isMobilePlansOpen
                                ? 'translate-x-0'
                                : 'translate-x-full'
                        }`}
                    >

                        <div className="h-full flex flex-col">


                            {/* DRAWER HEADER */}

                            <div className="shrink-0 px-4 py-4 border-b border-slate-200">

                                <div className="flex items-center justify-between">

                                    <div className="flex items-center gap-2">

                                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">

                                            <History className="w-4 h-4 text-indigo-600" />

                                        </div>


                                        <div>

                                            <h2 className="text-sm font-extrabold text-slate-900">
                                                Recent Plans
                                            </h2>

                                            <p className="text-[10px] text-slate-400">
                                                Your generated reports
                                            </p>

                                        </div>

                                    </div>


                                    <button
                                        onClick={() =>
                                            setIsMobilePlansOpen(
                                                false
                                            )
                                        }
                                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500"
                                    >

                                        <X className="w-4 h-4" />

                                    </button>

                                </div>


                                <div className="mt-3 bg-white border border-slate-200 rounded-xl px-3 py-2 flex items-center justify-between">

                                    <span className="text-[10px] font-semibold text-slate-500">
                                        Saved plans
                                    </span>


                                    <span className="text-xs font-black text-indigo-600">

                                        {reports?.length || 0}

                                    </span>

                                </div>

                            </div>


                            {/* MOBILE LIST */}

                            <div className="flex-1 min-h-0 overflow-y-auto p-3">

                                {!reports ||
                                reports.length === 0 ? (

                                    <div className="h-full flex flex-col items-center justify-center text-center px-5">

                                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">

                                            <History className="w-5 h-5 text-slate-400" />

                                        </div>


                                        <h3 className="text-xs font-bold text-slate-700">
                                            No plans yet
                                        </h3>


                                        <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed">

                                            Your generated interview plans
                                            will appear here.

                                        </p>

                                    </div>

                                ) : (

                                    <div className="space-y-2.5">

                                        {reports.map(
                                            (report) => {

                                                const score =
                                                    report.matchScore ||
                                                    0;

                                                const config =
                                                    getScoreConfig(
                                                        score
                                                    );


                                                return (

                                                    <button
                                                        key={
                                                            report._id
                                                        }
                                                        onClick={() => {

                                                            setIsMobilePlansOpen(
                                                                false
                                                            );

                                                            navigate(
                                                                `/interview/${report._id}`
                                                            );

                                                        }}
                                                        className="w-full text-left bg-white border border-slate-200 hover:border-indigo-200 rounded-xl p-3 transition"
                                                    >

                                                        <div className="flex items-start gap-2.5">

                                                            <div className="w-8 h-8 shrink-0 rounded-lg bg-indigo-50 flex items-center justify-center">

                                                                <BriefcaseBusiness className="w-3.5 h-3.5 text-indigo-600" />

                                                            </div>


                                                            <div className="flex-1 min-w-0">

                                                                <div className="flex items-center justify-between gap-2">

                                                                    <h3 className="text-xs font-bold text-slate-800 truncate">

                                                                        {
                                                                            report.title ||
                                                                            'Untitled Position'
                                                                        }

                                                                    </h3>


                                                                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />

                                                                </div>


                                                                <div className="flex items-center gap-1.5 mt-1">

                                                                    <Clock3 className="w-3 h-3 text-slate-300" />

                                                                    <span className="text-[9px] text-slate-400">

                                                                        {new Date(
                                                                            report.createdAt
                                                                        ).toLocaleDateString(
                                                                            undefined,
                                                                            {
                                                                                month: 'short',
                                                                                day: 'numeric',
                                                                                year: 'numeric',
                                                                            }
                                                                        )}

                                                                    </span>

                                                                </div>


                                                                <div className="mt-2.5 flex justify-end">

                                                                    <span
                                                                        className={`text-[9px] font-extrabold px-1.5 py-1 rounded-md border ${config.bg} ${config.text} ${config.border}`}
                                                                    >

                                                                        {
                                                                            score
                                                                        }
                                                                        % Match

                                                                    </span>

                                                                </div>

                                                            </div>

                                                        </div>

                                                    </button>

                                                );

                                            }
                                        )}

                                    </div>

                                )}

                            </div>

                        </div>

                    </aside>

                </div>

            </div>

        </div>
    );
};


export default Home;

