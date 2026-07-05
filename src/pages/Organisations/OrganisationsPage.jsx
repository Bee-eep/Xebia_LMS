/* @ author : Gurnoor Singh
@email: gsingh13_be23@thapar.edu
mobile : +91- 7814205303
Thapar institute of engineering and technology, Patiala
*/

/*
 * Component: OrganisationsPage
 * Purpose: This page displays the organisations directory.
 * It includes statistics cards, a data table with filtering/search,
 * a plan distribution summary, and a modal form to add new organisations.
 */
import React, { useState } from 'react';
import {
    Building2, CheckCircle2, Clock, TrendingUp, Search,
    ChevronLeft, ChevronRight, Plus, X
} from 'lucide-react';
import CountUp from '@/components/ui/CountUp.jsx';
import BorderGlow from '@/components/ui/BorderGlow.jsx';
import { useTheme } from '@/context/ThemeContext.jsx';
import { useOrganisations } from '@/hooks/useOrganisations.js';

export default function OrganisationsPage({ searchQuery }) {
    const { theme } = useTheme();
    const { organisations, loading, addOrganisation } = useOrganisations();
    const [localSearch, setLocalSearch] = useState('');
    const [planFilter, setPlanFilter] = useState('All Plans');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newOrg, setNewOrg] = useState({
        name: '', domain: '', plan: 'STARTER', seats: '', owner: '', mrr: ''
    });

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        await addOrganisation(newOrg);
        setIsModalOpen(false);
        setNewOrg({ name: '', domain: '', plan: 'STARTER', seats: '', owner: '', mrr: '' });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="h-10 w-10 border-4 border-tranquil-velvet border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Derive Stats dynamically
    const totalOrgs = organisations.length;
    const activeOrgs = organisations.filter(o => o.status === 'ACTIVE').length;
    const trialOrgs = organisations.filter(o => o.status === 'TRIAL').length;
    const totalMrr = organisations.reduce((sum, org) => sum + org.mrr, 0);

    const activePercentage = totalOrgs > 0 ? Math.round((activeOrgs / totalOrgs) * 100) : 0;

    // Plan Distribution
    const starterCount = organisations.filter(o => o.plan === 'STARTER').length;
    const growthCount = organisations.filter(o => o.plan === 'GROWTH').length;
    const enterpriseCount = organisations.filter(o => o.plan === 'ENTERPRISE').length;

    const activeSearch = searchQuery || localSearch;

    // Filter Data
    const filteredOrganisations = organisations.filter(org => {
        const matchesSearch = org.name.toLowerCase().includes(activeSearch.toLowerCase()) ||
            org.domain.toLowerCase().includes(activeSearch.toLowerCase());
        const matchesPlan = planFilter === 'All Plans' || org.plan === planFilter;
        const matchesStatus = statusFilter === 'All Status' || org.status === statusFilter;
        return matchesSearch && matchesPlan && matchesStatus;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredOrganisations.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredOrganisations.length / itemsPerPage);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const getPlanBadge = (plan) => {
        switch (plan) {
            case 'ENTERPRISE':
                return <span className="px-2.5 py-1 bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 rounded-full text-[10px] font-extrabold uppercase tracking-wider">ENTERPRISE</span>;
            case 'GROWTH':
                return <span className="px-2.5 py-1 bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 rounded-full text-[10px] font-extrabold uppercase tracking-wider">GROWTH</span>;
            case 'STARTER':
                return <span className="px-2.5 py-1 bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300 rounded-full text-[10px] font-extrabold uppercase tracking-wider">STARTER</span>;
            default:
                return <span className="px-2.5 py-1 bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300 rounded-full text-[10px] font-extrabold uppercase tracking-wider">{plan}</span>;
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'ACTIVE':
                return <span className="px-2.5 py-1 bg-emerald/10 text-emerald rounded text-[10px] font-bold uppercase tracking-wider">ACTIVE</span>;
            case 'TRIAL':
                return <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 rounded text-[10px] font-bold uppercase tracking-wider">TRIAL</span>;
            case 'SUSPENDED':
                return <span className="px-2.5 py-1 bg-red-500/10 text-red-500 rounded text-[10px] font-bold uppercase tracking-wider">SUSPENDED</span>;
            default:
                return <span className="px-2.5 py-1 bg-dark-grey/10 text-dark-grey rounded text-[10px] font-bold uppercase tracking-wider">{status}</span>;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: 'Total Organisations', count: totalOrgs, change: '+4 this quarter', icon: Building2, color: '304 76 30', bgClass: 'bg-purple-100 dark:bg-purple-500/20', iconColor: 'text-purple-600 dark:text-purple-400' },
                    { title: 'Active', count: activeOrgs, change: `${activePercentage}% of total`, icon: CheckCircle2, color: '176 99 34', bgClass: 'bg-emerald/10', iconColor: 'text-emerald' },
                    { title: 'Trial', count: trialOrgs, change: 'Avg 9 days left', icon: Clock, color: '304 76 30', bgClass: 'bg-amber-100 dark:bg-amber-500/20', iconColor: 'text-amber-600 dark:text-amber-400' },
                    { title: 'MRR from Orgs', count: totalMrr, isCurrency: true, change: '+6.2% this month', icon: TrendingUp, color: '176 99 34', bgClass: 'bg-emerald/10', iconColor: 'text-emerald' }
                ].map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <BorderGlow
                            key={idx}
                            edgeSensitivity={20}
                            glowColor={stat.color}
                            backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
                            borderRadius={16}
                            glowRadius={30}
                            glowIntensity={1.2}
                        >
                            <div className="p-5 flex justify-between items-center bg-white dark:bg-[#16171F] rounded-2xl h-full">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-dark-grey uppercase tracking-wider">{stat.title}</span>
                                    <p className="text-2xl font-extrabold text-black dark:text-white flex items-center">
                                        {stat.isCurrency ? (
                                            <span>₹<CountUp from={0} to={stat.count} duration={1.2} separator="," /></span>
                                        ) : (
                                            <CountUp from={0} to={stat.count} duration={1.2} separator="," />
                                        )}
                                    </p>
                                    <p className="text-[10px] text-emerald font-semibold">{stat.change}</p>
                                </div>
                                <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${stat.bgClass} ${stat.iconColor}`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                            </div>
                        </BorderGlow>
                    );
                })}
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Main Table Panel */}
                <div className="flex-1 bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl shadow-sm p-6 flex flex-col space-y-6">

                    {/* Controls, Filters, Search */}
                    <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                            {!searchQuery && (
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-blueish-grey dark:bg-bg-page border border-medium-grey dark:border-border-card rounded-xl w-60">
                                    <Search className="h-4 w-4 text-dark-grey" />
                                    <input
                                        type="text"
                                        placeholder="Search organisations..."
                                        value={localSearch}
                                        onChange={(e) => setLocalSearch(e.target.value)}
                                        className="bg-transparent text-xs text-black dark:text-white focus:outline-none w-full font-medium"
                                    />
                                </div>
                            )}

                            {/* Plan Filter */}
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blueish-grey dark:bg-bg-page border border-medium-grey dark:border-border-card rounded-xl">
                                <select
                                    value={planFilter}
                                    onChange={(e) => setPlanFilter(e.target.value)}
                                    className="bg-transparent text-xs text-black dark:text-white focus:outline-none font-bold cursor-pointer"
                                >
                                    <option value="All Plans">All Plans</option>
                                    <option value="ENTERPRISE">Enterprise</option>
                                    <option value="GROWTH">Growth</option>
                                    <option value="STARTER">Starter</option>
                                </select>
                            </div>

                            {/* Status Filter */}
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blueish-grey dark:bg-bg-page border border-medium-grey dark:border-border-card rounded-xl">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="bg-transparent text-xs text-black dark:text-white focus:outline-none font-bold cursor-pointer"
                                >
                                    <option value="All Status">All Status</option>
                                    <option value="ACTIVE">Active</option>
                                    <option value="TRIAL">Trial</option>
                                    <option value="SUSPENDED">Suspended</option>
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-4 py-2 bg-gradient-to-r from-tranquil-velvet to-bright-velvet hover:opacity-95 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-tranquil-velvet/20"
                        >
                            <Plus className="h-4 w-4" />
                            <span>New Organisation</span>
                        </button>
                    </div>

                    {/* Datatable */}
                    <div className="overflow-x-auto sleek-scrollbar flex-1">
                        <table className="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr className="border-b border-medium-grey/50 dark:border-border-card text-dark-grey uppercase font-bold tracking-wider bg-blueish-grey/50 dark:bg-bg-page/50">
                                    <th className="p-4 rounded-tl-lg">Organisation</th>
                                    <th className="p-4">Plan</th>
                                    <th className="p-4">Seats</th>
                                    <th className="p-4">Owner</th>
                                    <th className="p-4">MRR</th>
                                    <th className="p-4 rounded-tr-lg">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(org => (
                                    <tr key={org.id} className="border-b border-medium-grey/30 dark:border-border-card/30 hover:bg-blueish-grey/30 dark:hover:bg-bg-page/20 transition">
                                        <td className="p-4">
                                            <p className="font-bold text-black dark:text-white text-sm">{org.name}</p>
                                            <p className="font-medium text-[10px] text-dark-grey">{org.domain}</p>
                                        </td>
                                        <td className="p-4">{getPlanBadge(org.plan)}</td>
                                        <td className="p-4 font-semibold text-dark-grey">{org.usedSeats}/{org.seats}</td>
                                        <td className="p-4 font-medium text-dark-grey">{org.owner}</td>
                                        <td className="p-4 font-extrabold text-black dark:text-white">{formatCurrency(org.mrr)}</td>
                                        <td className="p-4">{getStatusBadge(org.status)}</td>
                                    </tr>
                                ))}

                                {currentItems.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="p-12 text-center text-dark-grey font-semibold">
                                            No organisations match your criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination controls */}
                    <div className="flex justify-between items-center border-t border-medium-grey/40 dark:border-border-card/40 pt-4 mt-auto">
                        <span className="text-[10px] font-bold text-dark-grey uppercase tracking-wider">
                            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredOrganisations.length)} of {filteredOrganisations.length} organisations
                        </span>
                        {totalPages > 1 && (
                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 border border-medium-grey dark:border-border-card bg-blueish-grey dark:bg-bg-page hover:bg-medium-grey/30 rounded-lg transition disabled:opacity-50 cursor-pointer text-dark-grey"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <span className="text-xs font-bold text-black dark:text-white px-3">Page {currentPage} of {totalPages}</span>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 border border-medium-grey dark:border-border-card bg-blueish-grey dark:bg-bg-page hover:bg-medium-grey/30 rounded-lg transition disabled:opacity-50 cursor-pointer text-dark-grey"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Plan Distribution Sidebar */}
                <div className="w-full lg:w-72 bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl shadow-sm p-6 flex flex-col gap-4">
                    <h3 className="font-extrabold text-sm text-black dark:text-white mb-2">Plan Distribution</h3>

                    <div className="bg-gray-100 dark:bg-gray-500/10 rounded-2xl p-5 flex flex-col transition-transform hover:scale-[1.02] cursor-default border border-transparent dark:hover:border-gray-500/30">
                        <span className="text-2xl font-extrabold text-gray-800 dark:text-gray-200"><CountUp from={0} to={starterCount} duration={1} /></span>
                        <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-1">STARTER</span>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-500/10 rounded-2xl p-5 flex flex-col transition-transform hover:scale-[1.02] cursor-default border border-transparent dark:hover:border-blue-500/30">
                        <span className="text-2xl font-extrabold text-blue-800 dark:text-blue-300"><CountUp from={0} to={growthCount} duration={1} /></span>
                        <span className="text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-wider mt-1">GROWTH</span>
                    </div>

                    <div className="bg-emerald/10 dark:bg-emerald/10 rounded-2xl p-5 flex flex-col transition-transform hover:scale-[1.02] cursor-default border border-transparent dark:hover:border-emerald/30">
                        <span className="text-2xl font-extrabold text-emerald dark:text-emerald"><CountUp from={0} to={enterpriseCount} duration={1} /></span>
                        <span className="text-[10px] font-bold text-emerald/80 dark:text-emerald/80 uppercase tracking-wider mt-1">ENTERPRISE</span>
                    </div>
                </div>
            </div>

            {/* Add New Organisation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white dark:bg-bg-card rounded-2xl shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200 border border-medium-grey dark:border-border-card">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 rounded-xl bg-blueish-grey dark:bg-bg-page hover:bg-medium-grey/40 dark:hover:bg-[#1E1F29] text-dark-grey transition cursor-pointer">
                            <X className="h-4 w-4" />
                        </button>
                        <h2 className="text-lg font-extrabold text-black dark:text-white mb-1">Add New Organisation</h2>
                        <p className="text-xs text-dark-grey font-medium mb-6">Create a new organisation tenant with default settings.</p>

                        <form onSubmit={handleAddSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-dark-grey uppercase tracking-wider">Organisation Name</label>
                                <input required type="text" value={newOrg.name} onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })} className="w-full px-4 py-2 bg-blueish-grey dark:bg-bg-page border border-medium-grey dark:border-border-card rounded-xl text-sm font-medium text-black dark:text-white focus:outline-none focus:border-tranquil-velvet transition" placeholder="e.g. Acme Corp" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-dark-grey uppercase tracking-wider">Domain</label>
                                <input required type="text" value={newOrg.domain} onChange={(e) => setNewOrg({ ...newOrg, domain: e.target.value })} className="w-full px-4 py-2 bg-blueish-grey dark:bg-bg-page border border-medium-grey dark:border-border-card rounded-xl text-sm font-medium text-black dark:text-white focus:outline-none focus:border-tranquil-velvet transition" placeholder="e.g. acme.lms.com" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-dark-grey uppercase tracking-wider">Plan</label>
                                    <select value={newOrg.plan} onChange={(e) => setNewOrg({ ...newOrg, plan: e.target.value })} className="w-full px-4 py-2 bg-blueish-grey dark:bg-bg-page border border-medium-grey dark:border-border-card rounded-xl text-sm font-medium text-black dark:text-white focus:outline-none focus:border-tranquil-velvet transition">
                                        <option value="STARTER">Starter</option>
                                        <option value="GROWTH">Growth</option>
                                        <option value="ENTERPRISE">Enterprise</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-dark-grey uppercase tracking-wider">Allocated Seats</label>
                                    <input required type="number" value={newOrg.seats} onChange={(e) => setNewOrg({ ...newOrg, seats: e.target.value })} className="w-full px-4 py-2 bg-blueish-grey dark:bg-bg-page border border-medium-grey dark:border-border-card rounded-xl text-sm font-medium text-black dark:text-white focus:outline-none focus:border-tranquil-velvet transition" placeholder="e.g. 50" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-dark-grey uppercase tracking-wider">Owner Name</label>
                                    <input required type="text" value={newOrg.owner} onChange={(e) => setNewOrg({ ...newOrg, owner: e.target.value })} className="w-full px-4 py-2 bg-blueish-grey dark:bg-bg-page border border-medium-grey dark:border-border-card rounded-xl text-sm font-medium text-black dark:text-white focus:outline-none focus:border-tranquil-velvet transition" placeholder="e.g. John Doe" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-dark-grey uppercase tracking-wider">Monthly MRR (₹)</label>
                                    <input required type="number" value={newOrg.mrr} onChange={(e) => setNewOrg({ ...newOrg, mrr: e.target.value })} className="w-full px-4 py-2 bg-blueish-grey dark:bg-bg-page border border-medium-grey dark:border-border-card rounded-xl text-sm font-medium text-black dark:text-white focus:outline-none focus:border-tranquil-velvet transition" placeholder="e.g. 15000" />
                                </div>
                            </div>

                            <div className="pt-4 flex items-center justify-end gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-xs font-bold text-dark-grey hover:bg-blueish-grey dark:hover:bg-bg-page rounded-xl transition cursor-pointer">Cancel</button>
                                <button type="submit" className="px-5 py-2 bg-gradient-to-r from-tranquil-velvet to-bright-velvet hover:opacity-95 text-white text-xs font-bold rounded-xl transition shadow-md shadow-tranquil-velvet/20 cursor-pointer">Add Organisation</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
