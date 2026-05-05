<script>
    const TRIVIA_MESSAGES = [
        "The resource pack for the 2nd LegitiAwards was 64mb!",
        "The CLAs were formerly called the Community Moose World Recap",
        "No one knew Legitimoose was hosting until the very last weeks for the 2nd CLAs!",
        "20% of the resource pack size was taken up by the 24mb Battle Train video D:",
        "The LegitiAwards Team consists of Trplnr and Hazel, starring Legitimoose, featuring Arvelyx and PolishKrowa, and a random guy lurking named Omri",
        "All the animations were painstakingly animated by Trplnr",
        "All the cool music were made by Hazel!",
        "The world had its max player cap and RAM increased to handle the traffic lmao",
        "The Legitimoose staff considered adding SVC to the server just for this event",
        "Apparently if you don't join on the version the resource pack was made for, it breaks! Wow, who would've guessed D:<",
        "You can get kicked if you spam the speaker book too fast",
        "Arvelyx knew Battle Train won 1 month before the awarding but the rest of the Railroad Xing members didn't probably",
        "The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly but gets faster each minute after you hear this signal bodeboop. A sing lap should be completed every time you hear this sound. ding Remember to run in a straight line and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark. Get ready!… Start. ding",
        "Crazy? I was crazy once, They locked me in a room, a rubber room, a rubber room with rats, and rats make me crazy.",
        "Mosse Worlds held the 3rd legawards where LegitiDiner by spaceinvadeer won WOTY",
        "These trivia messages do not have full stops, or periods if you call it that way, or dots if ur cool, uh or points if yro'ue a mathematician or just weird but cool ig",
        "THE END RODS ARE NOT REAL!! THEY'RE WAXED EXPOSED LIGHTNING RODS IN DISGUISE!!!",
        "The screen technically isn't flat, each element is spaced apart by 0.001 in the Z axis",
        "The whole slideshow is inside a registry.mcfunction where it is 6000+ lines long and 300+kb big",
        "Spyglass (the VSCode extension) doesn't like it if you have a 6000 line /data command",
        "You could rename the 2nd CLAs to the Clair Obscur: Expedition Barden Awards",
        "Apparently Railroad Xing reads as Railroad Crossing",
        "Apparently Railroad Xing reads as Railroad Zing",
        "Apparently Railroad Xing reads as Railroad Shing",
        "Apparently Railroad Xing reads as Railroad Qing",
        "Apparently Railroad Xing reads as Railroad Ching",
        "1 + 1 = 2",
        "1 + 1 = 3",
        "1 + 1 = 11",
        "1 + 1 = Uncaught SyntaxError: Invalid left-hand side in assignment",
        "The world has more than 64 NPCs!",
        "Both Legitimoose and Legitermoose exists inside the world :D",
        "Both Legitimooseapi and Legitermooseapi exists inside the world :D",
        "All Aspect bots are inside the world :O",
        "mmfgh~",
        'The trophies are officially called "Reefs"',
        "There are four reefs in total: Bronze Reef, Silver Reef, Golden Reef, and Amethyst Reef",
        "We had to edit the slideshow in the code live during tiebreaker sequences",
        "WHY DID YOU GIVE ME 2 TIEBREAKERS TO IMPLEMENT GRRR",
        `"slavery is fine but dont say 'L bozo' or i will kidnap you" - mmmmmaaaaaxxxxx`,
    ]

    function getRandomTriviaMessage() {
        return "Did you know? " + TRIVIA_MESSAGES[Math.floor(Math.random() * TRIVIA_MESSAGES.length)]
    }

    let selectedTriviaMessage = $state(getRandomTriviaMessage())
    setInterval(() => {
        selectedTriviaMessage = getRandomTriviaMessage()
    }, 10 * 1000)
</script>

<div class="main-container">
    <img src="assets/img/press_kit/community_legitiawards_wordmark.png" alt="Community LegitiAwards Wordmark" class="header-image" />
    <h2 class="wip-message">Under Construction</h2>
    <p class="trivia">{selectedTriviaMessage}</p>
</div>

<style>
    .main-container {
        width: 100vw;
        height: 100vh;
        background-image: url('/assets/img/main_bg.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        & img.header-image {
            width: 400px;
            height: auto;
        }

        & .wip-message {
            font-family: "MinecraftFive";
            font-weight: bold;
            font-size: 3em;
            background-image: linear-gradient(
                to bottom right, 
                #2d0336,
                rgb(15, 1, 19),
                #130216,
                black
            );
            background-clip: text;
            position: relative;
            color: transparent;
            -webkit-text-stroke: 10px transparent;
            padding: 10px;

            &::before {
                content: 'Under Construction';
                position: absolute;
                bottom: 12px;
                background-image: linear-gradient(
                    to right, 
                    #f057ff, 
                    #810f9c,
                    #dd0bf2,
                    #810f9c,
                    #f057ff
                );
                background-clip: text;
                color: transparent;
                -webkit-text-stroke: 0px transparent;
            }
        }

        & .trivia {
            font-family: "MinecraftDefault";
            font-size: 1.5em;
            max-width: 500px;
            line-height: 1;
            text-align: center;
            color: white;
            animation: splash-text 0.5s ease-in-out infinite alternate;
        }
    }

    @keyframes splash-text {
        0% {
            scale: 1;
        }
        100% {
            scale: 1.05;
        }
    }
</style>