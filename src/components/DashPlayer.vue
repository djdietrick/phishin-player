<<template>
    <div class="dashplayer">
       <Queue />
        <Icon />
        <Controller />
        <Audio />
    </div>
</template>

<script>
import Controller from './DashPlayer-controller';
import Icon from "./DashPlayer-icon";
import Queue from "./DashPlayer-queue";
import Audio from "./DashPlayer-audio";

const AudioPlayer = {
    components: {
        Controller,
        Icon,
        Queue,
        Audio
    }
}

export default AudioPlayer;

</script>

<style lang="scss" scoped>
@import "../styles/main.scss";
.dashplayer {
    height: 90vh;
    width: 90vw;
    background-color: $color-area;
    border-radius: 2rem;
    
    display: grid;
    grid-template-rows: 1fr 7fr;
    grid-template-columns: 1fr 7fr;

    .queue {
        grid-row: 2 / -1;
        grid-column: 1 / -1;
    }

    .controller {
        grid-row: 1 / 2;
        grid-column: 2 / -1;
    }
}

</style>