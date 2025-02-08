"use client";

import { useUser } from "@clerk/nextjs";

export const WelcomeMsg = () => {
    const { user, isLoaded } = useUser();
    
    return (
        <div className="space-y-2 mb-4">
            <h2 className="text-2xl lg:text-4xl text-white font-medium"> 
                Welcom Back{ isLoaded ? ", " : " "}{user?.username}
            </h2>
            <p className="text-sm lg:text-base text-lime-500"> 
                This is your Financial Report Overview 
            </p>
        </div>
    );
};