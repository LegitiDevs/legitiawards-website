<script>
    let { width = "100%", thickness = "5px" } = $props();
</script>

<div class="gold-horizontal-line" style="width: {width}; height: {thickness};"></div>

<style>
    .gold-horizontal-line {
        background-image: linear-gradient(to right, #FFA600, #BE6626, #FFC15C, #FF9500, #FFE063, #BE7726, #FFC300);
    }
</style>