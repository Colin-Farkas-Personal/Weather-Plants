<div class="container">
    <div class="child">
        <h2>Child</h2>
    </div>
    <div class="child">
        <h2>Child</h2>
    </div>
    <div class="child">
        <h2>Child</h2>
    </div>
    <div class="child">
        <h2>Child</h2>
    </div>
    <div class="child">
        <h2>Child</h2>
    </div>
    <div class="child">
        <h2>Child</h2>
    </div>
</div>

<style lang="scss">
    .container {
        z-index: 100;
        scroll-snap-type: x mandatory;
        display: flex;
        gap: 1rem;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        width: 400px;

        color: white;
        outline: 1px solid orange;


        .child {
            flex: 1;
            scroll-snap-align: center;
            display: grid;
            place-items: center;
            font-size: 3rem;
            border: 2px solid white;
            color: white;
        }
    }
</style>