<script lang="ts">
    type Props = {
        length?: string,
        thickness?: string,
        orientation?: "horizontal" | "vertical"
    }
    let { length = "100%", thickness = "5px", orientation = "horizontal" }: Props = $props();
</script>

<div class={["gold-line", { [orientation]: true }]} style={
    orientation == "horizontal" ? `width: ${length}; height: ${thickness};` : `width: ${thickness}; height: ${length};`
}>
</div>

<style>
    .gold-line {
        &.horizontal {
            background-image: linear-gradient(to right, #FFA600, #BE6626, #FFC15C, #FF9500, #FFE063, #BE7726, #FFC300);
        }

        &.vertical {
            background-image: linear-gradient(to bottom, #FFA600, #BE6626, #FFC15C, #FF9500, #FFE063, #BE7726, #FFC300);
        }
    }
</style>