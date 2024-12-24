<script lang="ts">
    import {
        ArrowLeft,
        ArrowRight,
        CheckCircleIcon,
        CircleDashed,
        CircleXIcon,
        CrossIcon,
        List,
        Lock,
        ArrowUpRight,
    } from "lucide-svelte";
    import { Doc } from "sveltefire";
    import Coin from "@tabler/icons-svelte/IconCoin.svelte";
    import Affiliate from "@tabler/icons-svelte/IconAffiliate.svelte";
    import { Input } from "@/components/ui/SignupForm";
    import { sendErrorToast, sendSuccessToast } from "@/toast_utils";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import { page } from "$app/stores";

    let loading = false;
    let answer = "";
    let questionsVisible = false;

    export let data;
    let questions = data.questions;
    let isAdmin = data.isAdmin;

    let currQuestion = 0;
    $: currQuestionData = questions[currQuestion];

    let startTime: Date | null = new Date(data.startTime);
    let endTime: Date | null = new Date(data.endTime);

    const updateQuestionVisibility = () => {
        const now = new Date();
        questionsVisible =
            (startTime && endTime && now >= startTime && now <= endTime) ||
            isAdmin;
    };

    const submitAnswer = async () => {
        loading = true;
        const r = await fetch(`/api/submit`, {
            method: "POST",
            body: JSON.stringify({
                answer,
                userId: data.locals.userId,
                questionId: currQuestionData.uid,
            }),
        });
        if (r.ok) {
            const rdata = await r.json();
            if (rdata.correct) {
                sendSuccessToast("Level cleared", "Your answer was correct");
                if (currQuestion < questions.length - 1) currQuestion++;
            } else {
                sendErrorToast("Wrong answer", "Give it another shot");
            }
        } else {
            sendErrorToast("Error submitting", "Something went wrong");
        }
        loading = false;
    };

    const updateComment = () => {
        if (currQuestionData === null || currQuestionData === undefined) return;
        if (browser) {
            const e = document.getElementById(";)");
            e.innerHTML = "";
            e.appendChild(document.createComment(currQuestionData.comment));
        }
    };

    $: currQuestionData, updateComment();
    $: updateQuestionVisibility();
</script>
<title>CryptIQ - Play</title>
{#if questionsVisible}
    <Doc ref={`/teams/${data.locals.userTeam}`} let:data={teamData}>
        <p slot="loading" class="loading"></p>
        <div class="navbar">
            <a
                class="btn btn-ghost text-md"
                class:text-primary={$page.url.pathname === "/"}
                href="/"><ArrowUpRight /> Home</a
            >
            <button
                class="btn btn-square"
                disabled={currQuestion === 0}
                on:click={() => {
                    if (!(currQuestion <= 0)) currQuestion--;
                }}
            >
                <ArrowLeft />
            </button>
            <a
                class="btn btn-ghost text-xl"
                class:text-primary={(teamData.completed_levels || []).includes(
                    currQuestionData.uid,
                )}
            >
                Level {questions[currQuestion].level}/{questions.length}
            </a>
            <button
                class="btn btn-square mr-4"
                on:click={() => {
                    if (!(currQuestion >= questions.length - 1)) currQuestion++;
                }}
                disabled={currQuestion === questions.length - 1 ||
                    !(teamData.completed_levels || []).includes(
                        currQuestionData.uid,
                    )}
            >
                {#if !(teamData.completed_levels || []).includes(currQuestionData.uid)}
                    <Lock />
                {:else}
                    <ArrowRight />
                {/if}
            </button>
            <button class="btn btn-ghost mr-4">
                <Affiliate />
                {teamData.teamName}
            </button>
            <button class="btn btn-ghost mr-4">
                <Coin />
                {(teamData.level || 1) * 100 - 100}
            </button>
            <button
                class="btn btn-ghost"
                on:click={() =>
                    document.getElementById("logsModal").showModal()}
            >
                <List />
                Prev Answers
            </button>
        </div>

        <center>
            <p class="text-4xl mb-4">{currQuestionData.prompt}</p>
            {#if currQuestionData.files.length !== 0}
                <div>
                    <p class="text-lg font-medium">Files</p>
                    {#each currQuestionData.files as f}
                        <span
                            class="link link-primary"
                            on:click={() => open(f.url)}>{f.name}</span
                        >
                    {/each}
                </div>
            {/if}
            {#if currQuestionData.images.length !== 0}
                <p class="text-lg font-medium mt-4 mb-2">Images</p>
                <center class="mb-4">
                    <div class="flex justify-center flex-row h-60">
                        {#each currQuestionData.images as i}
                            <img class="mr-2 ml-2 rounded-lg" src={i} />
                        {/each}
                    </div>
                </center>
            {/if}

            {#if !(teamData.completed_levels || []).includes(currQuestionData.uid)}
                <div class="w-[50%] mb-4">
                    <Input
                        id="answer"
                        placeholder="..."
                        type="text"
                        onInput={(e) => {
                            answer = e.target.value.replace(/[^a-z]/g, "");
                            e.target.value = answer;
                        }}
                    />
                </div>
                <button
                    class="btn btn-wide btn-primary"
                    disabled={loading}
                    on:click={submitAnswer}
                >
                    {#if loading}
                        <span
                            class="loading loading-ring text-primary loading-lg"
                        ></span>
                    {:else}
                        Submit
                    {/if}
                </button>
            {:else}
                <button class="btn btn-wide btn-success">
                    <CheckCircleIcon color="#000000" />
                </button>
            {/if}
        </center>
    </Doc>
{:else}
    You cannot view this right now.
{/if}

<dialog id="logsModal" class="modal">
    <div class="modal-box">
        <form method="dialog">
            <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >✕</button
            >
        </form>
        <Doc ref={`/logs/${data.locals.userTeam}`} let:data={logData}>
            <p slot="loading" class="loading"></p>
            {#each logData.logs as log}
                {#if log.type === "correct_answer"}
                    <button class="btn btn-ghost"
                        ><CheckCircleIcon class="text-success" /> {log.entered}
                    </button><br />
                {:else}
                    <button class="btn btn-ghost"
                        ><CircleXIcon class="text-secondary" /> {log.entered}
                    </button><br />
                {/if}
            {/each}
        </Doc>
    </div>
</dialog>
