<script lang="ts">
    import { BackgroundBeams } from "@/components/ui/BackgroundBeams";
    import { Button } from "@/components/ui/MovingBorder";
    import Countdown from "svelte-countdown/src/index.js";
    let showRules = false;
</script>

<title>CryptIQ - Home</title>
{#if !showRules}
    <div
        class="relative flex h-screen w-full flex-col items-center justify-center rounded-md px-32 antialiased"
    >
        <BackgroundBeams />
        <div class="px-8 md:px-16 lg:px-32">
            <Countdown
                from="2025-01-03 17:00:00"
                dateFormat="YYYY-MM-DD H:m:s"
                zone="Asia/Kolkata"
                let:remaining
            >
                <p
                    class="relative z-10 mx-auto my-2 max-w-lg text-center font-mono text-sm text-neutral-500"
                >
                    {remaining.days} days, {remaining.hours} hours, {remaining.minutes}
                    minutes, {remaining.seconds} seconds
                </p>
            </Countdown>
            <h2
                class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-7xl font-bold text-transparent"
            >
                CryptIQ
            </h2>
            <p></p>
            <p
                class="relative z-10 mx-auto my-2 max-w-lg text-center text-sm text-neutral-500"
            >
                Where minds meet challenges<br />Think . Connect . Solve
            </p>
        </div>
        <div
            style="align-items: center;justify-content: center;display: flex;"
            class="mt-6"
        >
            <div>
                <Button
                    borderRadius="0.75rem"
                    className="bg-white-300 text-white border-slate-800 text-sm font-bold"
                    onClick={() => (window.location.href = "/ready")}
                >
                    Let's Go
                </Button>
                <Button
                    borderRadius="0.75rem"
                    className="bg-white-300 text-white border-slate-800 text-sm font-bold"
                    onClick={() => (showRules = !showRules)}
                >
                    Read Me
                </Button>
            </div>
        </div>
    </div>
{/if}
{#if showRules}
    <div
        class="relative flex h-screen w-full flex-col items-center justify-start rounded-md px-32 antialiased"
    >
        <BackgroundBeams />
        <div
            style="align-items: center;justify-content: center;display: flex;"
            class="mt-6"
        >
            <div>
                <Button
                    borderRadius="0.75rem"
                    className="bg-white-300 text-white border-slate-800 text-sm font-bold"
                    onClick={() => (showRules = !showRules)}
                >
                    Take Me Back
                </Button>
            </div>
        </div>
        <div
            style="align-items: center;justify-content: center;display: flex;"
            class="mt-6 pb-[3vh]"
        >
            <div>
                <div
                    class="bg-white-300 text-white border-slate-800 border-2 text-sm w-[80vw] min-w-[80vw] max-w-[80vw] p-[5vh_10vw] rounded-[0.75rem]"
                >
                    <div class="pb-[3vh]">
                        <h2
                            class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans font-bold text-transparent text-4xl md:text-6xl lg:text-7xl"
                        >
                            What is CryptIQ?
                        </h2>
                        <p
                            class="relative z-10 text-justify text-sm text-neutral-400"
                        >
                            CryptIQ is an online cryptic hunt event hosted
                            during Paradox's Margazhi 2025 at IIT Madras.
                            Participants will team up to tackle a series of
                            challenging levels, deciphering clues and solving
                            riddles to progress. The event will test their wit,
                            collaboration, and problem-solving skills, which
                            will probably leave everyone thrilled and eager for
                            more.
                        </p>
                    </div>
                    <div class="pb-[3vh]">
                        <h2
                            class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-2xl font-bold text-transparent pb-[1vh]"
                        >
                            What are cryptic hunts anyway?
                        </h2>
                        <p></p>
                        <p
                            class="relative z-10 text-justify text-sm text-neutral-400"
                        >
                            A cryptic hunt is like a puzzle-solving game where
                            you solve riddles, clues, or challenges to move from
                            one hint to the next. Each clue usually leads to the
                            next clue, and the goal is to reach the final answer
                            of a level by decoding all the hints along the way.
                            It often involves thinking creatively, solving
                            wordplay, interpreting patterns, and sometimes even
                            searching online for hidden answers. It's a fun mix
                            of brain teasers, logic, and exploration. Cipher
                            coders, AI tools, QR codes, coding softwares, etc.
                            are all allowed and encouraged to be used.
                        </p>
                    </div>
                    <div class="pb-[3vh]">
                        <h2
                            class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-2xl font-bold text-transparent pb-[1vh]"
                        >
                            How will winners be decided?
                        </h2>
                        <p
                            class="relative z-10 text-justify text-sm text-neutral-400"
                        >
                            Winners will be decided based on the leaderboard
                            standings at the end of the competition. The two
                            teams at the top of the leaderboard will be declared
                            the winners. The leaderboard ranks teams based on
                            how quickly they solve the puzzles, with teams that
                            solve earlier being placed higher. Accuracy is not a
                            criteria.
                        </p>
                    </div>
                    <div class="pb-[3vh]">
                        <h2
                            class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-2xl font-bold text-transparent pb-[1vh]"
                        >
                            Rules
                        </h2>
                        <ul
                            class="relative z-10 text-justify text-sm text-neutral-400 list-disc pl-5"
                        >
                            <li>
                                Make sure you have registered on the platform
                                using only your registered student email. If you
                                don't have one, you can still play but you won't
                                be considered for the prizes. Make sure you are
                                part of atleast one team.
                            </li>
                            <li>
                                Make sure you have joined the <a
                                    href="https://discord.gg/38FYHdmYx3"
                                    >Discord server</a
                                > as well.
                            </li>
                            <li>
                                Asking other players for hints or sharing
                                answers or hints among users via any medium is
                                strictly prohibited. If found, it will lead to
                                direct disqualification.
                            </li>
                            <li>
                                Reverse engineering the platform means a direct
                                ban from the competition. Bugs, if found, should
                                be reported and not exploited. Exploiting a bug
                                also leads to disqualification.
                            </li>
                            <li>
                                Obscene or offensive usernames and team names
                                are not allowed.
                            </li>
                            <li>
                                <b>
                                    Decisions by organizers are final and should
                                    not be questioned.
                                </b>
                            </li>
                            <li>
                                By playing the game, you agree to adhere to all
                                the rules and guidelines.
                            </li>
                        </ul>
                    </div>
                    <div class="pb-[3vh]">
                        <h2
                            class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-2xl font-bold text-transparent pb-[1vh]"
                        >
                            Guidelines
                        </h2>
                        <ul
                            class="relative z-10 text-justify text-sm text-neutral-400 list-disc pl-5"
                        >
                            <li>
                                To report misconduct by any player, DM any
                                member of the team.
                            </li>
                            <li>
                                All hints and lead confirmations will be done
                                via the <a href="https://discord.gg/38FYHdmYx3"
                                    >official Discord server</a
                                > only.
                            </li>
                            <li>
                                You can always clear your doubts on the Discord
                                server. Be sure not to discuss answers or
                                question about answers in any way.
                            </li>
                            <li>
                                Lead confirmations are short private yes/no
                                questions. You may ask leads about the level you
                                are on in the dedicated private channels on
                                Discord and organizers would respond with yes or
                                no. You get 3 leads per day per person by
                                default and this number is subject to change. Be
                                updated on Discord. Unused leads don't stack.
                                Unanswered leads can be changed. Confusing leads
                                will not be considered.
                            </li>
                            <li>
                                And if it was not obvious, answer sharing, leads
                                sharing and cross teaming in general is not
                                allowed and any such evidence can lead to
                                disqualification.
                            </li>
                            <li>
                                Unless otherwise stated, file passwords,
                                passkeys, etc. encountered in any level allow
                                all characters. So brute forcing won't help
                                much.
                            </li>
                        </ul>
                    </div>
                    <div class="pb-[4vh]">
                        <h2
                            class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-2xl font-bold text-transparent pb-[1vh]"
                        >
                            Learning resources
                        </h2>
                        <p
                            class="relative z-10 text-justify text-sm text-neutral-400 pb-[0.5vh]"
                        >
                            Cryptic hunts generally revolve around tech, trivia,
                            and mostly anything you can find on the internet.
                            Googling is allowed and heavily encouraged, but it
                            won't directly get you the answer in most cases.
                            Think logically, make connections between different
                            parts of levels. Cryptic hunts are all about
                            connecting the dots and finding the solutions.
                        </p>
                        <p
                            class="relative z-10 text-justify text-sm text-neutral-400 pb-[0.5vh]"
                        >
                            Keep getting your leads confirmed from the
                            organizers. If you think you've gotten stuck
                            somewhere, seek for hints on Discord. The levels
                            will basically consist of a set of clues, all which
                            link to ONE ANSWER. The difficulty is random. When
                            you get two or more clues, try to connect them and
                            find an interrelated clue from it. If you can't
                            figure out the hint, try breaking it down and
                            solving it in parts.
                        </p>
                        <p
                            class="relative z-10 text-justify text-sm text-neutral-400 pb-[0.5vh]"
                        >
                            <i
                                >Note: Not all tools and approaches are listed
                                below. Read these to get you through some of the
                                levels. But tougher levels requires much more
                                brain power and tools not listed here may also
                                be used. Sky's truly the limit.</i
                            >
                        </p>
                        <ul
                            class="relative z-10 text-justify text-sm text-neutral-400 list-disc pl-5 pb-[0.5vh]"
                        >
                            <li>
                                <strong>Hunt's Site:</strong> Clues are sometimes
                                hidden in the hunt's rules and maybe even in the
                                event descriptions. The page title. The URL. Focus
                                on every word carefully as almost every hunt uses
                                a lot of wordplay.
                            </li>
                            <li>
                                <strong>Source Code:</strong> Look at the code comments.
                                There could be other links inside the code (This
                                especially helps in cases in which there aren't any
                                on-screen clues). You can even try using Inspect
                                Element (Ctrl+Shift+I) or Viewing Page Source (Ctrl+Shift+U).
                            </li>
                            <li>
                                <strong>Audio Files:</strong> Inspect the name, duration,
                                and content. Use spectrograms and tools like Audacity
                                or Sonic Visualizer for hidden text. Look for morse
                                code, binary, or locked files. Adjust the tempo or
                                format for clues.
                            </li>
                            <li>
                                <strong>Videos/GIFs:</strong> Focus on specific frames,
                                extract relevant audio, or slow down/speed up videos
                                to uncover clues. Visual or audio elements like morse/binary
                                code may be hidden.
                            </li>
                            <li>
                                <strong>Images:</strong> Check the image file name,
                                dimensions, and metadata for hidden strings or steganography.
                                Use tools like Aperisolve to detect and extract hidden
                                info by adjusting contrast or brightness.
                            </li>
                            <li>
                                <strong>Backlinks:</strong> If it looks like a completely
                                random string, try appending it to the end of common
                                URL patterns, like bit.ly/string, youtube.com/watch?v=string
                                etc. This is known as a backlink. Backlinks are key!
                                Use sites like imgur, pastebin, bit.ly, and tinyurl.
                                For encrypted pastebins, find the password clues.
                                Use a4x.me to identify backlinks when unsure.
                            </li>
                            <li>
                                <strong>Ciphers:</strong> Pay attention to ciphers,
                                such as Morse code, binary, or simple text substitutions
                                (like Caesar or Vigenère ciphers). The creators are
                                known to use a lot of ciphers, so expect clues to
                                be encoded in these forms, often hidden within clues
                                or images.
                            </li>
                        </ul>
                        <p
                            class="relative z-10 text-justify text-sm text-neutral-400"
                        >
                            Keep experimenting, stay creative! All the best!
                        </p>
                    </div>
                    <div class="pb-[3vh]">
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <div class="flex flex-col items-center">
                                <a href="">
                                    <h2
                                        class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-2xl font-bold text-transparent"
                                    >
                                        Soham Wani
                                    </h2>
                                    <p
                                        class="relative z-10 text-center text-sm text-neutral-400 pb-[1vh]"
                                    >
                                        (Event Head)
                                    </p></a
                                >
                            </div>
                            <div class="flex flex-col items-center">
                                <a href="">
                                    <h2
                                        class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-2xl font-bold text-transparent"
                                    >
                                        Shreya Mohanty
                                    </h2>
                                    <p
                                        class="relative z-10 text-center text-sm text-neutral-400 pb-[1vh]"
                                    >
                                        (Deputy Head)
                                    </p></a
                                >
                            </div>
                            <div class="flex flex-col items-center">
                                <a href="">
                                    <h2
                                        class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-2xl font-bold text-transparent"
                                    >
                                        Adrija Bose
                                    </h2>
                                    <p
                                        class="relative z-10 text-center text-sm text-neutral-400 pb-[1vh]"
                                    >
                                        (Volunteer)
                                    </p></a
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}
