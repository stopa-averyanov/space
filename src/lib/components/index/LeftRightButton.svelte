<script lang='ts'>
import { asset } from "$app/paths";


const props : { clickLeft : () => void, clickRight : () => void } = $props();

</script>
<div class='buttons'>
    <div class='button-left' onclick={props.clickLeft} style={`background-image: url('${asset('/arrow-left.svg')}')`}>
    </div>
    <div class='button-right' onclick={props.clickRight} style={`background-image: url('${asset('/arrow-left.svg')}')`}>
    </div>
</div>

<style>
.buttons {
    display: flex;
    flex-direction: row;
    gap: 128px;
}
.button-left {
    min-width: 72px;
    min-height: 72px;
    background-size: cover;
}
.button-right {
    min-width: 72px;
    min-height: 72px;
    background-size: cover;
    transform: scaleX(-1);
}
</style>