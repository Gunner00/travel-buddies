import React from "react";
import { useRouter } from "next/router";

export default function CongratulationsPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-14 pt-20 md:flex-row justify-center items-center p-10 lg:p-20">
                    <section className="flex flex-col justify-center items-center lg:w-1/2">
                        <h1 className="interHeader text-center"> Congratulations on completing your trip! Click to go find another buddy.</h1>
                </section>
            <button
                onClick={() => {
                    router.push("/startTripPage")
                }}
                className="w-[95vw] bg-black text-white text-2xl font-medium px-10 py-4 rounded-xl"
                disabled={false}
            >New Trip</button>
        </div>
    );
}