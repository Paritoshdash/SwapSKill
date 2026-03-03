import React from 'react';
import { getServerSkills } from '@/lib/server/skills';
import { createClient } from '@/utils/supabase/server';
import { SkillsContent } from '@/components/skills/SkillsContent';

export default async function SkillsPage() {
    const skills = await getServerSkills();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <main className="min-h-screen bg-[#050505] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background elements to maintain luxury aesthetic */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

            <div className="max-w-7xl mx-auto relative z-10 animate-fade-in-up">
                {/* Page Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                        Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Skills</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        Discover top-tier talent and trade your expertise. Browse through our curated collection of community skills.
                    </p>
                </div>

                <SkillsContent initialSkills={skills} currentUserId={user?.id} />
            </div>
        </main>
    );
}
