<script lang="ts">
    import "../app.css"
    import {ToastContainer,BootstrapToast} from "svelte-toasts";
    import {auth,db,storage } from '$lib/firebase';
    import {FirebaseApp, } from "sveltefire";
    import {ArrowUpRight,Disc} from "lucide-svelte";
    import {page} from '$app/stores';
    export let data;
</script>

<FirebaseApp {auth} firestore={db} {storage}>
    <ToastContainer let:data={data}>
        <BootstrapToast {data} />
</ToastContainer>

    {#if ["/","/leaderboard","/team"].includes($page.url.pathname)}
        <div class="navbar">
            <a class="btn btn-ghost text-md" class:text-primary={$page.url.pathname==="/"} href="/"><ArrowUpRight/> Home</a>
            <a class="btn btn-ghost text-md" class:text-primary={$page.url.pathname==="/leaderboard"} href="/leaderboard"><ArrowUpRight/> Leaderboard</a>
            {#if ![undefined,null].includes(data.userTeam)}<a class="btn btn-ghost text-md" class:text-primary={$page.url.pathname==="/team"} href="/team"><ArrowUpRight/> Team</a>{/if}
            {#if data.banned === false && ![undefined,null].includes(data.userTeam)}<a class="btn btn-ghost text-md" href="/play"><Disc /> Play</a>{/if}
        </div>
        {/if}
<slot />
</FirebaseApp>
