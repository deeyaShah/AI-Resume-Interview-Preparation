import React, { useState, useEffect } from 'react';
import { useInterview } from '../hooks/InterviewHook';
import { useParams, useNavigate } from 'react-router';

import {
    BriefcaseBusiness,
    CalendarDays,
    Code2,
    MessageCircle,
    FileText,
    ChevronDown,
    CheckCircle2,
    AlertTriangle,
    CircleAlert,
    ArrowRight,
    Target,
    Brain,
    Download,
    Zap,
    TrendingUp,
    BookOpen,
    Sparkles,
} from 'lucide-react';


const ReportDashboard = () => {

    const { report, getReportById, loading ,getResumePdf} = useInterview();
    const { interviewId } = useParams();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('plan');

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId);
        }
    }, [interviewId]);

    if (loading || !report) {
        return (
            <main className="h-screen w-full bg-[#f7f8fc] flex items-center justify-center p-4">

                <div className="flex items-center gap-3 bg-white px-5 py-4 rounded-2xl border border-slate-200 shadow-sm">

                    <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />

                    <span className="font-semibold text-sm sm:text-base text-slate-700">
                        Loading your report...
                    </span>

                </div>

            </main>
        );
    }

    const techCount = report.technicalQuestions?.length || 0;
    const behavioralCount = report.behavioralQuestions?.length || 0;
    const planCount = report.preparationPlan?.length || 0;

    const matchScore = report.matchScore || 0;
    const getScoreMessage = () => {

        if (matchScore >= 85) return 'Excellent Match';
        if (matchScore >= 70) return 'Strong Match';
        if (matchScore >= 50) return 'Moderate Match';

        return 'Needs Improvement';
    };

    const getSeverityConfig = (severity) => {

        switch (severity?.toLowerCase()) {

            case 'high':
                return {
                    label: 'High',
                    color: 'text-red-600',
                    bg: 'bg-red-50',
                    border: 'border-red-100',
                    bar: 'bg-red-500',
                    icon: AlertTriangle,
                    width: '88%',
                };

            case 'medium':
                return {
                    label: 'Medium',
                    color: 'text-amber-600',
                    bg: 'bg-amber-50',
                    border: 'border-amber-100',
                    bar: 'bg-amber-500',
                    icon: CircleAlert,
                    width: '58%',
                };

            default:
                return {
                    label: 'Low',
                    color: 'text-emerald-600',
                    bg: 'bg-emerald-50',
                    border: 'border-emerald-100',
                    bar: 'bg-emerald-500',
                    icon: CheckCircle2,
                    width: '32%',
                };
        }
    };

    const navigationItems = [

        {
            id: 'plan',
            label: 'Preparation Plan',
            mobileLabel: 'Plan',
            count: `${planCount}d`,
            icon: CalendarDays,
        },

        {
            id: 'technical',
            label: 'Technical Questions',
            mobileLabel: 'Technical',
            count: techCount,
            icon: Code2,
        },

        {
            id: 'behavioral',
            label: 'Behavioral Questions',
            mobileLabel: 'Behavioral',
            count: behavioralCount,
            icon: MessageCircle,
        },

    ];

    return (

        <div className="h-screen w-full bg-[#f7f8fc] text-slate-800 font-sans overflow-hidden">

            <main className="h-full w-full p-2.5 sm:p-3 lg:p-5 overflow-hidden">

                <div className="max-w-[1750px] mx-auto h-full bg-white border border-slate-200/80 rounded-[22px] lg:rounded-[26px] shadow-[0_12px_45px_rgba(15,23,42,0.05)] overflow-hidden">

                    <div className="h-full grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)_255px] overflow-hidden">

                        <aside className="hidden lg:flex bg-[#fafaff] border-r border-slate-200 flex-col p-4 min-h-0 overflow-hidden">

                            <div className="pb-5 border-b border-slate-200">

                                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-3">

                                    <BriefcaseBusiness className="w-5 h-5 text-indigo-600" />

                                </div>


                                <h1 className="text-base font-extrabold text-slate-900 leading-snug wrap-words">

                                    {report.jobTitle ||
                                        report.title ||
                                        'Target Role Assessment'}

                                </h1>


                                <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-400">

                                    <CalendarDays className="w-3.5 h-3.5 shrink-0" />

                                    <span>

                                        {report.createdAt
                                            ? new Date(
                                                  report.createdAt
                                              ).toLocaleDateString(
                                                  'en-US',
                                                  {
                                                      month: 'short',
                                                      day: 'numeric',
                                                      year: 'numeric',
                                                  }
                                              )
                                            : 'Recently'}

                                    </span>

                                </div>

                            </div>

                            <div className="pt-5">

                                <p className="px-2 mb-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">

                                    Report Sections

                                </p>


                                <nav className="space-y-1.5">

                                    {navigationItems.map((item) => {

                                        const Icon = item.icon;
                                        const isActive =
                                            activeTab === item.id;


                                        return (

                                            <button
                                                key={item.id}
                                                onClick={() =>
                                                    setActiveTab(item.id)
                                                }
                                                className={`w-full flex items-center justify-between gap-2 px-2.5 py-2.5 rounded-xl text-left transition-all duration-200 ${
                                                    isActive
                                                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                                                        : 'text-slate-500 hover:bg-white hover:text-slate-800'
                                                }`}
                                            >

                                                <div className="flex items-center gap-2.5 min-w-0">

                                                    <div
                                                        className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center ${
                                                            isActive
                                                                ? 'bg-white/15'
                                                                : 'bg-slate-100'
                                                        }`}
                                                    >

                                                        <Icon
                                                            className={`w-4 h-4 ${
                                                                isActive
                                                                    ? 'text-white'
                                                                    : 'text-slate-500'
                                                            }`}
                                                        />

                                                    </div>


                                                    <span
                                                        className={`text-xs font-bold truncate ${
                                                            isActive
                                                                ? 'text-white'
                                                                : 'text-slate-700'
                                                        }`}
                                                    >

                                                        {item.label}

                                                    </span>

                                                </div>


                                                <span
                                                    className={`shrink-0 text-[9px] font-bold px-1.5 py-1 rounded-md ${
                                                        isActive
                                                            ? 'bg-white/15 text-white'
                                                            : 'bg-slate-100 text-slate-500'
                                                    }`}
                                                >

                                                    {item.count}

                                                </span>

                                            </button>

                                        );

                                    })}

                                </nav>

                            </div>

                            <div className="flex-1" />

                            <div className="pt-4 border-t border-slate-200">

                                <button
                                    onClick={()=>{getResumePdf(interviewId)}}
                                    className="w-full group flex items-center gap-2.5 p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-md shadow-indigo-100"
                                >

                                    <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">

                                        <FileText className="w-4 h-4" />

                                    </div>


                                    <div className="flex-1 text-left min-w-0">

                                        <p className="text-xs font-bold">
                                            Generate Resume
                                        </p>

                                        <p className="text-[9px] text-indigo-100 truncate">
                                            Build optimized resume
                                        </p>

                                    </div>


                                    <ArrowRight
                                        className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                                    />

                                </button>

                            </div>

                        </aside>

                        <div className="lg:hidden flex flex-col min-h-0 overflow-hidden">

                            <div className="shrink-0 bg-[#fafaff] border-b border-slate-200 px-4 py-3.5">

                                <div className="flex items-center gap-3">

                                    <div className="w-10 h-10 shrink-0 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">

                                        <BriefcaseBusiness className="w-5 h-5 text-indigo-600" />

                                    </div>


                                    <div className="min-w-0 flex-1">

                                        <h1 className="text-sm sm:text-base font-extrabold text-slate-900 truncate">

                                            {report.jobTitle ||
                                                report.title ||
                                                'Target Role Assessment'}

                                        </h1>


                                        <div className="flex items-center gap-1.5 mt-1 text-[10px] sm:text-xs text-slate-400">

                                            <CalendarDays className="w-3.5 h-3.5 shrink-0" />

                                            <span>

                                                {report.createdAt
                                                    ? new Date(
                                                          report.createdAt
                                                      ).toLocaleDateString(
                                                          'en-US',
                                                          {
                                                              month: 'short',
                                                              day: 'numeric',
                                                              year: 'numeric',
                                                          }
                                                      )
                                                    : 'Recently'}

                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className="shrink-0 px-3.5 sm:px-4 py-3 bg-white border-b border-slate-200">

                                <div className="bg-linear-to-r from-indigo-50 via-white to-violet-50 border border-indigo-100 rounded-2xl p-3.5">

                                    <div className="flex items-center gap-3">

                                        {/* Circular Score */}

                                        <div className="relative w-16 h-16 shrink-0">

                                            <svg
                                                className="w-full h-full -rotate-90"
                                                viewBox="0 0 100 100"
                                            >

                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    stroke="currentColor"
                                                    strokeWidth="9"
                                                    className="text-indigo-100"
                                                    fill="transparent"
                                                />

                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    stroke="currentColor"
                                                    strokeWidth="9"
                                                    className="text-indigo-600"
                                                    fill="transparent"
                                                    strokeDasharray="251"
                                                    strokeDashoffset={
                                                        251 -
                                                        (251 *
                                                            matchScore) /
                                                            100
                                                    }
                                                    strokeLinecap="round"
                                                />

                                            </svg>


                                            <div className="absolute inset-0 flex items-center justify-center">

                                                <span className="text-sm font-black text-slate-900">

                                                    {matchScore}%

                                                </span>

                                            </div>

                                        </div>


                                        <div className="min-w-0">

                                            <div className="flex items-center gap-1.5">

                                                <Target className="w-4 h-4 text-indigo-600 shrink-0" />

                                                <p className="text-sm font-extrabold text-slate-900">
                                                    Job Match Fit
                                                </p>

                                            </div>


                                            <p className="text-xs font-bold text-indigo-600 mt-0.5">

                                                {getScoreMessage()}

                                            </p>


                                            <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 truncate">

                                                Resume compatibility with target
                                                role.

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className="shrink-0 px-3.5 sm:px-4 py-2.5 bg-white border-b border-slate-200">

                                <nav className="flex gap-2 overflow-x-auto scrollbar-none">

                                    {navigationItems.map((item) => {

                                        const Icon = item.icon;
                                        const isActive =
                                            activeTab === item.id;


                                        return (

                                            <button
                                                key={item.id}
                                                onClick={() =>
                                                    setActiveTab(item.id)
                                                }
                                                className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition ${
                                                    isActive
                                                        ? 'bg-indigo-600 text-white shadow-sm'
                                                        : 'bg-slate-50 border border-slate-200 text-slate-600'
                                                }`}
                                            >

                                                <Icon className="w-3.5 h-3.5" />

                                                <span>
                                                    {item.mobileLabel}
                                                </span>

                                                <span
                                                    className={`text-[9px] px-1.5 py-0.5 rounded-md ${
                                                        isActive
                                                            ? 'bg-white/15'
                                                            : 'bg-white'
                                                    }`}
                                                >

                                                    {item.count}

                                                </span>

                                            </button>

                                        );

                                    })}

                                </nav>

                            </div>

                            <div className="flex-1 min-h-0 overflow-y-auto bg-white p-3.5 sm:p-4">

                                {activeTab === 'plan' && (

                                    <div>

                                        <div className="mb-4">

                                            <div className="flex items-center gap-2">

                                                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">

                                                    <Zap className="w-4 h-4 text-indigo-600" />

                                                </div>


                                                <div>

                                                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900">

                                                        Preparation Roadmap

                                                    </h2>

                                                    <p className="text-[10px] sm:text-xs text-slate-500">

                                                        Your focused interview
                                                        preparation plan.

                                                    </p>

                                                </div>

                                            </div>

                                        </div>


                                        <div className="space-y-3">

                                            {report.preparationPlan?.map(
                                                (plan) => (

                                                    <div
                                                        key={plan.day}
                                                        className="relative bg-slate-50 border border-slate-200 rounded-2xl p-4"
                                                    >

                                                        <div className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-indigo-500" />


                                                        <div className="pl-1">

                                                            <div className="flex items-center gap-2 mb-1">

                                                                <span className="text-[10px] font-extrabold uppercase text-indigo-600">

                                                                    Day{' '}
                                                                    {
                                                                        plan.day
                                                                    }

                                                                </span>

                                                                <span className="text-slate-300">
                                                                    •
                                                                </span>

                                                                <span className="text-[10px] text-slate-400">

                                                                    Phase{' '}
                                                                    {
                                                                        plan.day
                                                                    }

                                                                </span>

                                                            </div>


                                                            <h3 className="text-sm sm:text-base font-bold text-slate-900">

                                                                {plan.focus}

                                                            </h3>


                                                            <ul className="mt-3 space-y-2">

                                                                {plan.tasks?.map(
                                                                    (
                                                                        task,
                                                                        idx
                                                                    ) => (

                                                                        <li
                                                                            key={
                                                                                idx
                                                                            }
                                                                            className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 leading-relaxed"
                                                                        >

                                                                            <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-indigo-500" />

                                                                            <span>
                                                                                {
                                                                                    task
                                                                                }
                                                                            </span>

                                                                        </li>

                                                                    )
                                                                )}

                                                            </ul>

                                                        </div>

                                                    </div>

                                                )
                                            )}

                                        </div>

                                    </div>

                                )}

                                {activeTab === 'technical' && (

                                    <div>

                                        <div className="mb-4">

                                            <div className="flex items-center gap-2">

                                                <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">

                                                    <Code2 className="w-4 h-4 text-violet-600" />

                                                </div>


                                                <div>

                                                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900">

                                                        Technical Questions

                                                    </h2>

                                                    <p className="text-[10px] sm:text-xs text-slate-500">

                                                        Practice role-specific
                                                        technical questions.

                                                    </p>

                                                </div>

                                            </div>

                                        </div>


                                        <div className="space-y-2.5">

                                            {report.technicalQuestions?.map(
                                                (q, idx) => (

                                                    <details
                                                        key={idx}
                                                        className="group bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden"
                                                    >

                                                        <summary className="flex items-center justify-between gap-3 p-3.5 sm:p-4 cursor-pointer list-none">

                                                            <div className="flex items-start gap-2.5 min-w-0">

                                                                <span className="w-7 h-7 shrink-0 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center text-[10px] font-black">

                                                                    Q
                                                                    {idx + 1}

                                                                </span>


                                                                <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">

                                                                    {q.question}

                                                                </span>

                                                            </div>


                                                            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 group-open:rotate-180 transition-transform" />

                                                        </summary>


                                                        <div className="border-t border-slate-200 bg-white p-3.5 space-y-3">

                                                            <div className="bg-violet-50 border border-violet-100 rounded-xl p-3">

                                                                <div className="flex items-center gap-1.5 mb-1">

                                                                    <Brain className="w-3.5 h-3.5 text-violet-600" />

                                                                    <strong className="text-[9px] uppercase tracking-wider text-violet-600">

                                                                        Interviewer
                                                                        Intention

                                                                    </strong>

                                                                </div>


                                                                <p className="text-xs text-slate-600 leading-relaxed">

                                                                    {q.intention}

                                                                </p>

                                                            </div>


                                                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">

                                                                <div className="flex items-center gap-1.5 mb-1">

                                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />

                                                                    <strong className="text-[9px] uppercase tracking-wider text-slate-500">

                                                                        Suggested
                                                                        Answer

                                                                    </strong>

                                                                </div>


                                                                <p className="text-xs text-slate-600 leading-relaxed">

                                                                    {q.answer}

                                                                </p>

                                                            </div>

                                                        </div>

                                                    </details>

                                                )
                                            )}

                                        </div>

                                    </div>

                                )}

                                {activeTab === 'behavioral' && (

                                    <div>

                                        <div className="mb-4">

                                            <div className="flex items-center gap-2">

                                                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">

                                                    <MessageCircle className="w-4 h-4 text-emerald-600" />

                                                </div>


                                                <div>

                                                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900">

                                                        Behavioral Questions

                                                    </h2>

                                                    <p className="text-[10px] sm:text-xs text-slate-500">

                                                        Prepare confident
                                                        behavioral responses.

                                                    </p>

                                                </div>

                                            </div>

                                        </div>


                                        <div className="space-y-2.5">

                                            {report.behavioralQuestions?.map(
                                                (q, idx) => (

                                                    <details
                                                        key={idx}
                                                        className="group bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden"
                                                    >

                                                        <summary className="flex items-center justify-between gap-3 p-3.5 sm:p-4 cursor-pointer list-none">

                                                            <div className="flex items-start gap-2.5 min-w-0">

                                                                <span className="w-7 h-7 shrink-0 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] font-black">

                                                                    Q
                                                                    {idx + 1}

                                                                </span>


                                                                <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">

                                                                    {q.question}

                                                                </span>

                                                            </div>


                                                            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 group-open:rotate-180 transition-transform" />

                                                        </summary>


                                                        <div className="border-t border-slate-200 bg-white p-3.5 space-y-3">

                                                            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">

                                                                <div className="flex items-center gap-1.5 mb-1">

                                                                    <Brain className="w-3.5 h-3.5 text-emerald-600" />

                                                                    <strong className="text-[9px] uppercase tracking-wider text-emerald-600">

                                                                        Competency

                                                                    </strong>

                                                                </div>


                                                                <p className="text-xs text-slate-600 leading-relaxed">

                                                                    {q.intention}

                                                                </p>

                                                            </div>


                                                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">

                                                                <div className="flex items-center gap-1.5 mb-1">

                                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />

                                                                    <strong className="text-[9px] uppercase tracking-wider text-slate-500">

                                                                        STAR Response
                                                                        Outline

                                                                    </strong>

                                                                </div>


                                                                <p className="text-xs text-slate-600 leading-relaxed">

                                                                    {q.answer}

                                                                </p>

                                                            </div>

                                                        </div>

                                                    </details>

                                                )
                                            )}

                                        </div>

                                    </div>

                                )}

                            </div>

                            <div className="shrink-0 border-t border-slate-200 bg-[#fafaff] px-3.5 sm:px-4 py-3">

                                <details className="group">

                                    <summary className="flex items-center justify-between cursor-pointer list-none">

                                        <div className="flex items-center gap-2">

                                            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">

                                                <AlertTriangle className="w-4 h-4 text-amber-600" />

                                            </div>


                                            <div>

                                                <h2 className="text-xs sm:text-sm font-extrabold text-slate-900">

                                                    Skill Gaps

                                                </h2>

                                                <p className="text-[9px] sm:text-[10px] text-slate-400">

                                                    {report.skillGaps?.length || 0}{' '}
                                                    areas to improve

                                                </p>

                                            </div>

                                        </div>


                                        <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />

                                    </summary>


                                    <div className="mt-3 max-h-47.5 overflow-y-auto">

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                                            {report.skillGaps &&
                                            report.skillGaps.length > 0 ? (

                                                report.skillGaps.map(
                                                    (gap, i) => {

                                                        const config =
                                                            getSeverityConfig(
                                                                gap.severity
                                                            );

                                                        const SeverityIcon =
                                                            config.icon;


                                                        return (

                                                            <div
                                                                key={i}
                                                                className={`p-2.5 rounded-xl border ${config.border} ${config.bg}`}
                                                            >

                                                                <div className="flex items-start gap-2">

                                                                    <SeverityIcon
                                                                        className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${config.color}`}
                                                                    />


                                                                    <div className="flex-1 min-w-0">

                                                                        <div className="flex items-start justify-between gap-2">

                                                                            <h3 className="text-xs font-bold text-slate-800 wrap-words">

                                                                                {
                                                                                    gap.skill
                                                                                }

                                                                            </h3>


                                                                            <span
                                                                                className={`text-[8px] uppercase font-extrabold shrink-0 ${config.color}`}
                                                                            >

                                                                                {
                                                                                    config.label
                                                                                }

                                                                            </span>

                                                                        </div>


                                                                        <div className="mt-1.5 w-full h-1 bg-white rounded-full overflow-hidden">

                                                                            <div
                                                                                className={`h-full rounded-full ${config.bar}`}
                                                                                style={{
                                                                                    width: config.width,
                                                                                }}
                                                                            />

                                                                        </div>

                                                                    </div>

                                                                </div>

                                                            </div>

                                                        );

                                                    }
                                                )

                                            ) : (

                                                <div className="col-span-full flex items-center justify-center gap-2 py-4">

                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />

                                                    <span className="text-xs text-slate-500">
                                                        No skill gaps detected.
                                                    </span>

                                                </div>

                                            )}

                                        </div>

                                    </div>

                                </details>

                            </div>

                            <div className="shrink-0 px-3.5 sm:px-4 py-3 border-t border-slate-200 bg-white">

                                <button
                                    onClick={()=>{getResumePdf(interviewId)}}
                                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-4 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-indigo-100 transition"
                                >

                                    <Download className="w-4 h-4" />

                                    Generate Resume

                                    <ArrowRight className="w-3.5 h-3.5" />

                                </button>

                            </div>

                        </div>

                        <section className="hidden lg:flex min-w-0 min-h-0 flex-col bg-white overflow-hidden">


                            {/* CENTER HEADER */}

                            <div className="shrink-0 px-5 sm:px-7 py-5 border-b border-slate-200">


                                {activeTab === 'plan' && (

                                    <div className="flex items-center gap-2">

                                        <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">

                                            <Zap className="w-4.5 h-4.5 text-indigo-600" />

                                        </div>


                                        <div>

                                            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">

                                                7-Day Preparation Roadmap

                                            </h2>


                                            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">

                                                A focused plan to prepare for
                                                your target role.

                                            </p>

                                        </div>

                                    </div>

                                )}


                                {activeTab === 'technical' && (

                                    <div className="flex items-center gap-2">

                                        <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">

                                            <Code2 className="w-4.5 h-4.5 text-violet-600" />

                                        </div>


                                        <div>

                                            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">

                                                Technical Interview Questions

                                            </h2>


                                            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">

                                                Practice questions tailored to
                                                your target role.

                                            </p>

                                        </div>

                                    </div>

                                )}


                                {activeTab === 'behavioral' && (

                                    <div className="flex items-center gap-2">

                                        <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">

                                            <MessageCircle className="w-4.5 h-4.5 text-emerald-600" />

                                        </div>


                                        <div>

                                            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">

                                                Behavioral Interview Questions

                                            </h2>


                                            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">

                                                Prepare confident answers for
                                                behavioral interviews.

                                            </p>

                                        </div>

                                    </div>

                                )}

                            </div>

                            <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-7">

                                {activeTab === 'plan' && (

                                    <div className="space-y-4">

                                        {report.preparationPlan?.map(
                                            (plan) => (

                                                <div
                                                    key={plan.day}
                                                    className="group relative bg-slate-50/70 hover:bg-white border border-slate-200 hover:border-indigo-200 rounded-2xl p-5 transition-all hover:shadow-md"
                                                >

                                                    <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-full bg-indigo-500" />


                                                    <div className="flex gap-4 pl-2">

                                                        <div className="w-11 h-11 shrink-0 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">

                                                            <span className="text-sm font-black text-indigo-600">

                                                                {String(
                                                                    plan.day
                                                                ).padStart(
                                                                    2,
                                                                    '0'
                                                                )}

                                                            </span>

                                                        </div>


                                                        <div className="flex-1 min-w-0">

                                                            <div className="flex items-center gap-2 mb-1">

                                                                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">

                                                                    Day{' '}
                                                                    {
                                                                        plan.day
                                                                    }

                                                                </span>

                                                                <span className="text-slate-300">
                                                                    •
                                                                </span>

                                                                <span className="text-xs text-slate-400">

                                                                    Phase{' '}
                                                                    {
                                                                        plan.day
                                                                    }

                                                                </span>

                                                            </div>


                                                            <h3 className="text-base sm:text-lg font-bold text-slate-900">

                                                                {plan.focus}

                                                            </h3>


                                                            <ul className="mt-3 space-y-2">

                                                                {plan.tasks?.map(
                                                                    (
                                                                        task,
                                                                        idx
                                                                    ) => (

                                                                        <li
                                                                            key={
                                                                                idx
                                                                            }
                                                                            className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed"
                                                                        >

                                                                            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-indigo-500" />

                                                                            <span>
                                                                                {
                                                                                    task
                                                                                }
                                                                            </span>

                                                                        </li>

                                                                    )
                                                                )}

                                                            </ul>

                                                        </div>

                                                    </div>

                                                </div>

                                            )
                                        )}

                                    </div>

                                )}

                                {activeTab === 'technical' && (

                                    <div className="space-y-3">

                                        {report.technicalQuestions?.map(
                                            (q, idx) => (

                                                <details
                                                    key={idx}
                                                    className="group bg-slate-50/70 border border-slate-200 rounded-2xl overflow-hidden hover:border-violet-200 transition"
                                                >

                                                    <summary className="flex items-center justify-between gap-4 p-4 sm:p-5 cursor-pointer select-none list-none">

                                                        <div className="flex items-start gap-3 min-w-0">

                                                            <span className="shrink-0 w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center text-xs font-black">

                                                                Q
                                                                {idx + 1}

                                                            </span>


                                                            <span className="font-semibold text-sm sm:text-base text-slate-800 leading-relaxed">

                                                                {q.question}

                                                            </span>

                                                        </div>


                                                        <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 group-open:rotate-180 transition-transform" />

                                                    </summary>


                                                    <div className="border-t border-slate-200 bg-white p-4 sm:p-5 space-y-4">

                                                        <div className="rounded-xl bg-violet-50 border border-violet-100 p-4">

                                                            <div className="flex items-center gap-2 mb-1.5">

                                                                <Brain className="w-4 h-4 text-violet-600" />

                                                                <strong className="text-xs uppercase tracking-wider text-violet-600">

                                                                    Interviewer
                                                                    Intention

                                                                </strong>

                                                            </div>


                                                            <p className="text-sm text-slate-600 leading-relaxed">

                                                                {q.intention}

                                                            </p>

                                                        </div>


                                                        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">

                                                            <div className="flex items-center gap-2 mb-1.5">

                                                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />

                                                                <strong className="text-xs uppercase tracking-wider text-slate-500">

                                                                    Suggested
                                                                    Answer

                                                                </strong>

                                                            </div>


                                                            <p className="text-sm text-slate-600 leading-relaxed">

                                                                {q.answer}

                                                            </p>

                                                        </div>

                                                    </div>

                                                </details>

                                            )
                                        )}

                                    </div>

                                )}

                                {activeTab === 'behavioral' && (

                                    <div className="space-y-3">

                                        {report.behavioralQuestions?.map(
                                            (q, idx) => (

                                                <details
                                                    key={idx}
                                                    className="group bg-slate-50/70 border border-slate-200 rounded-2xl overflow-hidden hover:border-emerald-200 transition"
                                                >

                                                    <summary className="flex items-center justify-between gap-4 p-4 sm:p-5 cursor-pointer select-none list-none">

                                                        <div className="flex items-start gap-3 min-w-0">

                                                            <span className="shrink-0 w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-black">

                                                                Q
                                                                {idx + 1}

                                                            </span>


                                                            <span className="font-semibold text-sm sm:text-base text-slate-800 leading-relaxed">

                                                                {q.question}

                                                            </span>

                                                        </div>


                                                        <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 group-open:rotate-180 transition-transform" />

                                                    </summary>


                                                    <div className="border-t border-slate-200 bg-white p-4 sm:p-5 space-y-4">

                                                        <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">

                                                            <div className="flex items-center gap-2 mb-1.5">

                                                                <Brain className="w-4 h-4 text-emerald-600" />

                                                                <strong className="text-xs uppercase tracking-wider text-emerald-600">

                                                                    Competency

                                                                </strong>

                                                            </div>


                                                            <p className="text-sm text-slate-600 leading-relaxed">

                                                                {q.intention}

                                                            </p>

                                                        </div>


                                                        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">

                                                            <div className="flex items-center gap-2 mb-1.5">

                                                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />

                                                                <strong className="text-xs uppercase tracking-wider text-slate-500">

                                                                    STAR Response
                                                                    Outline

                                                                </strong>

                                                            </div>


                                                            <p className="text-sm text-slate-600 leading-relaxed">

                                                                {q.answer}

                                                            </p>

                                                        </div>

                                                    </div>

                                                </details>

                                            )
                                        )}

                                    </div>

                                )}

                            </div>

                        </section>

                        <aside className="hidden lg:flex bg-[#fafaff] border-l border-slate-200 p-4 flex-col min-h-0 overflow-hidden">

                            <div className="shrink-0 pb-5 border-b border-slate-200">

                                <div className="flex items-center gap-2 mb-3">

                                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">

                                        <Target className="w-4 h-4 text-indigo-600" />

                                    </div>


                                    <div>

                                        <h2 className="text-sm font-extrabold text-slate-900">
                                            Match Score
                                        </h2>

                                        <p className="text-[10px] text-slate-400">
                                            Job compatibility
                                        </p>

                                    </div>

                                </div>


                                <div className="bg-white border border-indigo-100 rounded-2xl p-4">

                                    <div className="flex items-center gap-4">

                                        <div className="relative w-20.5 h-20.5 shrink-0">

                                            <svg
                                                className="w-full h-full -rotate-90"
                                                viewBox="0 0 100 100"
                                            >

                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    stroke="currentColor"
                                                    strokeWidth="8"
                                                    className="text-indigo-100"
                                                    fill="transparent"
                                                />


                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    stroke="currentColor"
                                                    strokeWidth="8"
                                                    className="text-indigo-600"
                                                    fill="transparent"
                                                    strokeDasharray="251"
                                                    strokeDashoffset={
                                                        251 -
                                                        (251 *
                                                            matchScore) /
                                                            100
                                                    }
                                                    strokeLinecap="round"
                                                />

                                            </svg>


                                            <div className="absolute inset-0 flex items-center justify-center">

                                                <span className="text-lg font-black text-slate-900">

                                                    {matchScore}%

                                                </span>

                                            </div>

                                        </div>


                                        <div className="min-w-0">

                                            <p className="text-xs font-bold text-indigo-600">

                                                {getScoreMessage()}

                                            </p>


                                            <p className="text-[11px] text-slate-400 leading-relaxed mt-1">

                                                Based on your resume and target
                                                role.

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className="flex-1 min-h-0 flex flex-col pt-5">


                                <div className="flex items-center justify-between mb-3">

                                    <div className="flex items-center gap-2">

                                        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">

                                            <AlertTriangle className="w-4 h-4 text-amber-600" />

                                        </div>


                                        <div>

                                            <h2 className="text-sm font-extrabold text-slate-900">
                                                Skill Gaps
                                            </h2>

                                            <p className="text-[10px] text-slate-400">
                                                Areas to improve
                                            </p>

                                        </div>

                                    </div>


                                    <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded-md text-[10px] font-bold">

                                        {report.skillGaps?.length || 0}

                                    </span>

                                </div>


                                <div className="flex items-center gap-2 pb-3 border-b border-slate-200">

                                    <span className="flex items-center gap-1 text-[9px] font-bold text-red-500">

                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />

                                        High

                                    </span>


                                    <span className="flex items-center gap-1 text-[9px] font-bold text-amber-500">

                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />

                                        Medium

                                    </span>


                                    <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-500">

                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />

                                        Low

                                    </span>

                                </div>


                                <div className="flex-1 min-h-0 overflow-y-auto mt-3 space-y-2.5 pr-1">

                                    {report.skillGaps &&
                                    report.skillGaps.length > 0 ? (

                                        report.skillGaps.map(
                                            (gap, i) => {

                                                const config =
                                                    getSeverityConfig(
                                                        gap.severity
                                                    );

                                                const SeverityIcon =
                                                    config.icon;


                                                return (

                                                    <div
                                                        key={i}
                                                        className={`p-3 rounded-xl border ${config.border} ${config.bg} transition hover:shadow-sm`}
                                                    >

                                                        <div className="flex items-start gap-2">

                                                            <SeverityIcon
                                                                className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${config.color}`}
                                                            />


                                                            <div className="flex-1 min-w-0">

                                                                <div className="flex items-start justify-between gap-2">

                                                                    <h3 className="text-xs font-bold text-slate-800 leading-snug wrap-words">

                                                                        {gap.skill}

                                                                    </h3>


                                                                    <span
                                                                        className={`text-[8px] uppercase font-extrabold shrink-0 ${config.color}`}
                                                                    >

                                                                        {
                                                                            config.label
                                                                        }

                                                                    </span>

                                                                </div>


                                                                <div className="mt-2 w-full h-1 bg-white rounded-full overflow-hidden">

                                                                    <div
                                                                        className={`h-full rounded-full ${config.bar}`}
                                                                        style={{
                                                                            width: config.width,
                                                                        }}
                                                                    />

                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>

                                                );

                                            }
                                        )

                                    ) : (

                                        <div className="flex flex-col items-center justify-center text-center py-10">

                                            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-2">

                                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />

                                            </div>


                                            <h3 className="text-xs font-bold text-slate-700">
                                                No Skill Gaps
                                            </h3>


                                            <p className="text-[10px] text-slate-400 mt-1">
                                                Your profile looks well aligned.
                                            </p>

                                        </div>

                                    )}

                                </div>


                                <div className="pt-3 mt-3 border-t border-slate-200">

                                    <div className="flex items-start gap-2 bg-indigo-50 border border-indigo-100 rounded-xl p-2.5">

                                        <BookOpen className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />

                                        <p className="text-[10px] text-indigo-700 leading-relaxed">

                                            Focus on{' '}

                                            <strong>
                                                High Priority
                                            </strong>{' '}

                                            skills first.

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </aside>

                    </div>

                </div>

            </main>

        </div>
    );
};


export default ReportDashboard;
