<script>
    import {invalidateAll} from "$app/navigation";
    import {sendSuccessToast,sendErrorToast} from "$lib/toast_utils";

    export let data;
    import {Doc} from 'sveltefire';
    import {Button} from "@/components/ui/MovingBorder";
    import {Hammer} from "lucide-svelte";
    let clicked = false;
    let loading = false;
    async function leaveTeam (){
        loading = true;
        const r = await fetch('/api/team/leave',{
            method: "POST"
        });
        if(r.ok){
            sendSuccessToast(
               "Successfully Left",
                ""
            );
        } else {
            sendErrorToast(
                "Failed to Leave",
                ""
            );
        }
        await invalidateAll();
        loading = false;
    }
</script>

<h2 class="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center text-3xl font-medium tracking-tight text-transparent">
    Your team
</h2>


<Doc ref={`teams/${data.userTeam}`} let:data>

   <center>
       <p class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-6xl font-bold text-transparent pb-[1vh]">{data.teamName}</p>
       <Button
               borderRadius="0.75rem"
               className="bg-white-300 text-white border-slate-800 text-lg font-medium font-mono"
               onClick={()=>{
                   navigator.clipboard.writeText(data.code);
                   clicked = true;
                   setTimeout(()=>{
                       clicked = false;
                   }, 2000)

               }}
       >
           {#if clicked}
           Copied!
           {:else}{data.code}{/if}
       </Button>
       <!--{#if data.owner}-->
       <!--    -->
       <!--    {/if}-->
   </center>
   <center>
    <p class="text-lg mt-4 font-medium text-primary font-sans">Level {data.level} • Members {data.members.length}/3</p>

   </center>
    <center>
        <!--<div class=" mt-4 text-2xl text-secondary">Members</div>-->
        <!--{#each data.members as member}-->
        <!--    <div class="text-lg text-white">-->
        <!--        <Doc ref={`users/${member}`} let:data>-->
        <!--            {data.username}-->
        <!--        </Doc>-->
        <!--    </div>-->
        <!--{/each}-->
        <div class="w-[50%]">
            <div class="overflow-x-auto">

                    {#each data.members as member}
                        <Doc ref={`users/${member}`} let:data={data2}>
                            <p class="mt-2 font-medium text-xl">

                                {data2.username} {#if data.owner === member}👑{/if}</p>

                        </Doc>
                        {/each}

            </div>
        </div>

        {#if !data.banned}
        <button class="btn btn-wide mt-10 btn-outline btn-primary" disabled={loading} on:click={leaveTeam}>Leave team</button>
            {:else}
    <button class="text-xl mt-4 font-bold btn btn-ghost text-primary" > <Hammer /> Your team was banned by an admin</button>
            {/if}
            </center>


    <span class="loading loading-ring loading-xl" slot="loading "></span>

</Doc>

