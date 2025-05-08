// ===== SCENE ELEMENTS =====
// Add the second dressing room scene element (add this to the existing scene elements section)
const secondDressingRoomScene = document.getElementById('second-dressing-room-scene');

// ===== SECOND DRESSING ROOM ELEMENTS =====
const secondDressingNextButton = document.getElementById('second-dressing-next-button');
const secondTabButtons = document.querySelectorAll('.second-tab-button');
const secondTabContents = document.querySelectorAll('.second-tab-content');
const secondClothingItems = document.querySelectorAll('.second-clothing-item');
const secondCharacterBody = document.getElementById('second-character-body');
const secondCharacterHead = document.getElementById('second-character-head');

// ===== CHARACTER CUSTOMIZATION (update existing section) =====
// Selected items tracking for second dressing room
let secondSelectedHead = '';
let secondSelectedBody = '';

// ===== GAME VARIABLES =====
let currentScene = 'home-scene';
let hasKey = false;
let doorUnlocked = false;
let hasSecondKey = false;
let secondDoorUnlocked = false;
let diaryPageCount = 0; // Track which diary page is shown
let doorCodeAttempt = ""; // Track door code input
let imageToggled = false;
let currentPanelIndex = 0;


// ===== SCENE ELEMENTS =====
const homeScene = document.getElementById('home-scene');
const cutscene1 = document.getElementById('cutscene-1');
const roomScene = document.getElementById('room-scene');
const comicScene = document.getElementById('comic-scene');
const secondRoomScene = document.getElementById('second-room-scene'); // Make sure this exists
const dressingRoomScene = document.getElementById('dressing-room-scene');

// ===== VIDEO ELEMENTS =====
const videoPlayer = document.getElementById('video-player');
const nextButton = document.getElementById('next-button');

// ===== ROOM ELEMENTS =====
const player = document.getElementById('player');
const secondPlayer = document.getElementById('second-player'); // Player in the second room
const items = document.querySelectorAll('.item');
const secondRoomItems = document.querySelectorAll('.second-room-item'); // Items in the second room
const door = document.getElementById('door');
const secondDoor = document.getElementById('second-door'); // Door in the second room

// ===== OVERLAY ELEMENTS =====
const itemOverlay = document.getElementById('item-overlay');
const itemDisplay = document.getElementById('item-display');
const closeItem = document.getElementById('close-item');
const currentItem = document.getElementById('current-item');
const boxContent = document.getElementById('box-content');
const keyItem = document.getElementById('key-item');
const gameMessage = document.getElementById('game-message');
const keyImage = document.getElementById('key-image');        // ภาพในกล่อง
const imageOverlay = document.getElementById('image-overlay'); // overlay ที่โชว์ภาพเต็ม
const overlayImage = document.getElementById('overlay-image'); // <img> ที่โชว์ภาพเต็ม

// ===== DOOR CODE ELEMENTS =====
const doorCodeOverlay = document.getElementById('door-code-overlay');
const doorCodeInput = document.getElementById('door-code-input');
const doorCodeButtons = document.querySelectorAll('.code-button');
const doorCodeDisplay = document.getElementById('door-code-display');
const doorCodeSubmit = document.getElementById('door-code-submit');
const doorCodeCancel = document.getElementById('door-code-cancel');
const codeInput = document.getElementById('code-input');
const keypadButtons = document.querySelectorAll('.keypad-btn');
const closeDoorCode = document.getElementById('close-door-code');
const doorCodeContainer = document.getElementById('door-code-container');

// ===== COMIC SCENE ELEMENTS =====
const comicNextButton = document.getElementById('comic-next-button');
const comicPanels = document.querySelectorAll('.comic-panel');
const comicInstruction = document.querySelector('.comic-instruction');

// ===== DRESSING ROOM ELEMENTS =====

const dressingNextButton = document.getElementById('dressing-next-button');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const clothingItems = document.querySelectorAll('.clothing-item');
const characterBody = document.getElementById('character-body');
const characterHead = document.getElementById('character-head');


//blue
// ===== SLIDING SCENE ELEMENTS =====
const slidingScene = document.getElementById('sliding-scene');
const slidingPlayer = document.getElementById('sliding-player');
const slidingBackground = document.getElementById('sliding-background');
const slidingForeground = document.getElementById('sliding-foreground');
const slidingNPCs = document.getElementById('sliding-npcs');

// ===== DIALOGUE ELEMENTS =====
const dialogueOverlay = document.getElementById('dialogue-overlay');
const dialogueBox = document.getElementById('dialogue-box');
const npcPortrait = document.getElementById('npc-portrait');
const npcName = document.getElementById('npc-name');
const dialogueText = document.getElementById('dialogue-text');
const dialogueNext = document.getElementById('dialogue-next');

// ===== ITEM RECEIVED ELEMENTS =====
const itemReceivedOverlay = document.getElementById('item-received-overlay');
const itemImage = document.getElementById('item-image');
const itemDescription = document.getElementById('item-description');
const itemReceivedClose = document.getElementById('item-received-close');

// ===== SLIDING SCENE VARIABLES =====
let finalItemShown = false;
let backgroundMaxWidth = 4100; // ปรับตามความกว้างจริงของภาพพื้นหลังของคุณ
let endSceneTriggered = false; // ตัวแปรเพื่อป้องกันการทริกเกอร์ซ้ำ
let isPlayerCentered = false;
let backgroundPosition = 0;
let playerPosition = 0;
let screenMiddle;
const playerOffset = 50; // Half the player width to center properly
let npcsCompleted = {
    npc1: false,
    npc2: false,
    npc3: false
};
let currentDialogueIndex = 0;
let currentNPC = null;

// ===== ADD TO SCENE ELEMENTS SECTION =====
const cutscene2 = document.getElementById('cutscene-2');
const cutscene2VideoPlayer = document.getElementById('cutscene2-video-player');
const cutscene2NextButton = document.getElementById('cutscene2-next-button');

// NPC dialogue data
const npcDialogues = {
    npc1: [
        { name: "Marsha", text: "ฉันเพิ่งกลับมาจากการไปพักผ่อนส่วนตัวมาน่ะ" },
        { name: "Marsha", text: "สร้อยมุกอันนี้ฉันเพิ่งซื้อมา ไม่แพงมากหรอก แต่พวกเธอคงซื้อไม่ไหว" },
        { name: "Marsha", text: "สำหรับงานเทศกาลจันทร์สีฟ้า ฉันก็จ้างให้คนมาดูแลความเรียบร้อยทั้งหมด" },
        { name: "Marsha", text: "ทุกอย่างในชีวิตฉันล้วนสมบูรณ์แบบอยู่แล้ว แค่มีเงิน" },
        { name: "Oceana", text: "เธอรวยมากเลยนี่ ทำไมฉันไม่รวยบ้างนะ จะได้มีชุดดี ๆ ใส่" },
        { name: "Oceana", text: "ตอนนี้ชีวิตฉันก็ไม่ได้ลำบาก แต่อยากมีมากกว่านี้จริงๆ" },
        { name: "Oceana", text: "ฉันต้องการใส่ชุดแพง ๆ แบบนั้น" }
    ],
    npc2: [
        { name: "Myria", text: "ฉันเป็นหมึกพิเศษกว่าหมึกทั่วไป ไม่เหมือนหมึกตัวอื่น ๆ หรอกนะ" },
        { name: "Myria", text: "ดูผิวฉันสิ มีผิวสีเหลืองสดใส" },
        { name: "Myria", text: "สีของฉันน่ะทั้งสดใสและเฉิดฉายมากเลยนะ" },
        { name: "Myria", text: "หมึกที่มีสีเหมือนฉันน่ะ หายากและมีน้อย ไม่เหมือนหมึกทั่ว ๆ ไปที่ไม่มีอะไรเด่น" },
        { name: "Oceana", text: "เป็นหมึกเหมือนกันแท้ ๆ แต่ดูโดดเด่นจัง" },
        { name: "Oceana", text: "หมึกที่หายาก ฉันก็อยากจะเป็นแบบนั้น" },
        { name: "Oceana", text: "ฉันตอนนี้ทั้งน่าเกลียดและหม่นหมอง" },
        { name: "Oceana", text: "ฉันจะทำยังไงกับผิวของฉันดีล่ะ พวกมันน่าเกลียดจริง ๆ ฉันไม่อยากเห็นสีพวกนี้แล้ว" }

    ],
    npc3: [
        { name: "Nelly", text: "ทำไมเธอถึงดูเศร้าจังล่ะ มางานแบบนี้ต้องมั่นใจนะ" },
        { name: "Nelly", text: "เธอกำลังเปรียบเทียบตัวเองกับคนอื่นอยู่แน่เลย" },
        { name: "Nelly", text: "เธอเองก็มีดีนะ แต่ถ้าไม่พอใจในตอนนี้ ทำไมเธอไม่พัฒนาตัวเองขึ้นล่ะ" },
        { name: "Nelly", text: "อย่ามั่วแต่มาด้อยค่าตัวเองเลย ไปทำสิ่งที่เธอต้องการเถอะ" },
        { name: "Oceana", text: "เธอที่มีแต่คนอิจฉาแต่ก็มาให้กำลังใจฉัน" },
        { name: "Oceana", text: "ฉันคิดว่าเธอก็พูดไปอย่างนั้น แต่ฉันก็อยากจะลองดู" },
        { name: "Oceana", text: "ฉันรู้สึกอิจฉาจนอยู่เฉย ๆ ไม่ได้แล้ว"}
    ]
};

// ===== CONTENT DATA =====
// Array of diary pages
const diaryPages = [
    "./asset/image/background/BigRoomOceana/Diary1.PNG",
    "./asset/image/background/BigRoomOceana/Diary2.PNG",
    "./asset/image/background/BigRoomOceana/Diary3.PNG"
];

// ===== MOVEMENT CONTROLS =====
// Player movement
let keys = { ArrowLeft: false, ArrowRight: false };
let playerSpeed = 5; // Your speed
let animationFrameId = null;

// ===== CHARACTER CUSTOMIZATION =====
// Selected items tracking
let selectedHead = '';
let selectedBody = '';

// ===== SCENE ELEMENTS (Add to existing section) =====
const jigsawScene = document.getElementById('jigsaw-scene');
const jigsawContainer = document.getElementById('jigsaw-container');
const jigsawPieces = document.querySelectorAll('.jigsaw-piece');
const jigsawSuccess = document.getElementById('jigsaw-success');
const jigsawNextButton = document.getElementById('jigsaw-next-button');
const jigsawRevealedImage = document.getElementById('jigsaw-revealed-image');

// ===== JIGSAW GAME VARIABLES =====
let jigsawComplete = false;
let placedPieces = {
    piece1: false,
    piece2: false,
    piece3: false
};



// ===== INITIALIZATION FUNCTIONS =====
function checkElements() {
    console.log('Checking critical elements:');
    console.log('secondRoomScene:', secondRoomScene ? 'exists' : 'missing');
    console.log('secondPlayer:', secondPlayer ? 'exists' : 'missing');
    console.log('secondRoomItems count:', secondRoomItems.length);
    console.log('secondDoor:', secondDoor ? 'exists' : 'missing');
    console.log('comicScene:', comicScene ? 'exists' : 'missing');
    console.log('comicPanels count:', comicPanels.length);
}

// Make sure all scenes are hidden except the home scene at startup
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");

    // First, hide ALL scenes by both removing active class and setting display none
    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.remove('active');
        scene.style.display = 'none';
    });

    // Explicitly set home scene to be visible and active
    const homeScene = document.getElementById('home-scene');
    if (homeScene) {
        homeScene.classList.add('active');
        homeScene.style.display = 'flex';
        currentScene = 'home-scene';
        console.log('Home scene activated');
    } else {
        console.error('Home scene element not found!');
    }


    // Log all scenes and their display states
    document.querySelectorAll('.scene').forEach(scene => {
        console.log(`Scene ${scene.id}: display=${getComputedStyle(scene).display}, classList=${scene.classList}`);
    });

    // Initialize video
    videoPlayer.src = "./asset/video/Repo.mp4";
    cutscene2VideoPlayer.src = "./asset/video/cutscene end.mp4"; // Update with your actual video path
    // For testing only - simulate video end after 2 seconds
    if (cutscene2VideoPlayer) {
        cutscene2VideoPlayer.addEventListener('ended', () => {
            console.log('Video ended, showing next button'); // Debug logging
            if (cutscene2NextButton) {
                cutscene2NextButton.style.display = 'block';
            }
        });
    }
    
    // Click event for the next button after cutscene 2
    if (cutscene2NextButton) {
        cutscene2NextButton.addEventListener('click', () => {
            // Determine which scene should come after cutscene 2
            changeScene('home-scene'); // Replace with the appropriate next scene
            location.reload();
            // Reset the button display state for next time
            cutscene2NextButton.style.display = 'none';
        });
    }
    // Make sure dressing room is explicitly hidden

    if (dressingRoomScene) {
        
        dressingRoomScene.classList.remove('active');
        dressingRoomScene.style.display = 'none';
        setupDressingRoom();
        setupSecondDressingRoom();
        dressingRoomScene.classList.remove('active');
        dressingRoomScene.style.display = 'none';
        console.log('Dressing room explicitly hidden');

    }

    

    // Show key in the box
    keyItem.style.display = 'block';

    // Hide elements that should be hidden initially
    nextButton.style.display = 'none';
    itemOverlay.style.display = 'none';
    boxContent.style.display = 'none';
    gameMessage.style.display = 'none';
    doorCodeOverlay.style.display = 'none';

    // Initialize the scenes and event listeners but don't set up the dressing room yet
    setupFirstRoomItems();
    setupSecondRoomItems();
    setupDressingRoom();
    setupSlidingSceneTransition();
    setupSecondDressingRoom();


    
    // Setup room transition events if they exist
    const roomTransitionButtons = document.querySelectorAll('.room-transition');
    roomTransitionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetRoom = parseInt(button.getAttribute('data-room'));
            switchRoom(targetRoom);
        });
    });

    console.log('Game initialized, current scene:', currentScene);
});

// ===== SCENE MANAGEMENT =====
// Change scene function
function changeScene(sceneId) {
    // Hide all scenes
    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.remove('active');
        scene.style.display = 'none'; // Fallback safety
    });

    // Show the requested scene
    const newScene = document.getElementById(sceneId);
    newScene.classList.add('active');
    newScene.style.display = 'flex'; // Fallback safety

    currentScene = sceneId;
    console.log('Changed to scene:', sceneId);

    if (sceneId === 'cutscene-1') {
        videoPlayer.play();
        nextButton.style.display = 'none';
    }
}

// ===== UI FEEDBACK =====
// Show message function
function showMessage(message, duration = 3000) {
    gameMessage.textContent = message;
    gameMessage.style.display = 'block';

    setTimeout(() => {
        gameMessage.style.display = 'none';
    }, duration);
}

// ===== SCENE EVENT LISTENERS =====
// Home scene click event
homeScene.addEventListener('click', () => {
    changeScene('cutscene-1');
});

// Video ended event
videoPlayer.addEventListener('ended', () => {
    nextButton.style.display = 'block';
});

// Next button click event
nextButton.addEventListener('click', () => {
    changeScene('room-scene');
});

// ===== PLAYER MOVEMENT =====
document.addEventListener('keydown', (e) => {
    // Allow movement in all relevant scenes
    if (currentScene !== 'room-scene' && currentScene !== 'second-room-scene' && currentScene !== 'sliding-scene') return;

    if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !keys[e.key]) {
        keys[e.key] = true;
        if (!animationFrameId) {
            // Start the appropriate movement function based on current scene
            if (currentScene === 'sliding-scene') {
                moveSlidingPlayer();
            } else {
                movePlayer();
            }
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        keys[e.key] = false;

        // Stop movement if both keys are up
        if (!keys.ArrowLeft && !keys.ArrowRight) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;

            // Handle the player element based on the current scene
            if (currentScene === 'sliding-scene') {
                slidingPlayer.classList.remove('wiggle');
            } else {
                const activePlayer = currentScene === 'room-scene' ? player : secondPlayer;
                if (activePlayer) {
                    activePlayer.classList.remove('wiggle');
                }
            }
        }
    }
});

function movePlayer() {
    // Use the sliding movement system if in sliding scene
    if (currentScene === 'sliding-scene') {
        moveSlidingPlayer();
        return;
    }

    // Otherwise use the existing player movement for other scenes
    const activePlayer = currentScene === 'room-scene' ? player : secondPlayer;

    if (!activePlayer) {
        console.error('Active player not found!');
        return;
    }

    const playerPos = parseInt(getComputedStyle(activePlayer).left);
    const gameWidth = document.body.clientWidth;
    const playerWidth = activePlayer.offsetWidth;
    let newLeft = playerPos;

    if (keys.ArrowLeft) {
        newLeft = Math.max(0, playerPos - playerSpeed);
    }
    if (keys.ArrowRight) {
        newLeft = Math.min(gameWidth - playerWidth, playerPos + playerSpeed);
    }

    activePlayer.style.left = newLeft + 'px';

    if (!activePlayer.classList.contains('wiggle')) {
        activePlayer.classList.add('wiggle');
    }

    // Continue if any key is held
    if (keys.ArrowLeft || keys.ArrowRight) {
        animationFrameId = requestAnimationFrame(movePlayer);
    } else {
        animationFrameId = null;
        activePlayer.classList.remove('wiggle');
    }
}

// ===== ITEM INTERACTIONS - FIRST ROOM =====
// Item click events
items.forEach((item) => {
    item.addEventListener('click', () => {
        itemOverlay.style.display = 'flex';

        if (item.id === 'item3') { // กล่อง
            currentItem.style.backgroundImage = "url('./asset/image/background/BigRoomNelly/Item/ToyOpen.PNG')"; // เปลี่ยนภาพกล่อง
            currentItem.style.backgroundSize = 'cover';
            currentItem.style.backgroundPosition = 'center';
            currentItem.style.width = '60vw';
            currentItem.style.height = '85vh';

            currentItem.onclick = () => {
                boxContent.style.display = 'flex';
                showMessage('นี่เป็นฉันวัยเด็กน่ะ ตอนนั้นทั้งขี้อายแล้วก็ไม่มั่นใจในตัวเองเลย');
            };
        } else if (item.id === 'item2') { // ไอเทม 2
            currentItem.style.backgroundImage = "url('./asset/image/background/BigRoomNelly/Item/Board2.PNG')"; // เปลี่ยนภาพเฉพาะใน overlay
            currentItem.style.backgroundSize = 'cover';
            currentItem.style.backgroundPosition = 'center';
            currentItem.style.width = '500px';
            currentItem.style.height = '500px';
            currentItem.onclick = null;
            boxContent.style.display = 'none';
            showMessage('นี่เป็นบอร์ดที่ฉันทำเองเลย สร้างแรงบันดาลใจ');
            setTimeout(() => {
                showMessage('ดูพวกเขาจากอินเตอร์เน็ตมาแล้วอิจฉามาก ๆ เลยอยากจะเป็นให้ได้น่ะ');
            }, 3000); // 2000 มิลลิวินาที = 2 วินาที
        } else {
            currentItem.style.backgroundImage = getComputedStyle(item).backgroundImage;
            currentItem.style.backgroundSize = 'cover';
            currentItem.style.backgroundPosition = 'center';
            currentItem.style.width = '500px';
            currentItem.style.height = '500px';
            currentItem.onclick = null;
            boxContent.style.display = 'none';
            showMessage('ดูยายทวดของฉันสิ เธอคือไอดอลของฉันเลยล่ะ');
        }
    });
});

// ===== ITEM INTERACTIONS - SECOND ROOM =====
secondRoomItems.forEach((item) => {
    item.addEventListener('click', () => {
        itemOverlay.style.display = 'flex';

        if (item.id === 'second-item1') {
            currentItem.style.backgroundImage = "url('./asset/image/background/BigRoomOceana/Pic.PNG')";
            currentItem.style.backgroundSize = 'cover';
            currentItem.style.backgroundPosition = 'center';
            currentItem.style.height = '60vh';
            currentItem.onclick = null;
            boxContent.style.display = 'none';
            showMessage('อันนี้เป็นรูปฉันกับเพื่อน ฉันดูแย่มาก เลยไม่อยากจะเห็นมันน่ะ');
        } else if (item.id === 'second-item2') {
            // Initialize diary viewing
            diaryPageCount = 0;
            currentItem.style.backgroundImage = `url('${diaryPages[diaryPageCount]}')`;
            currentItem.style.backgroundSize = 'cover';
            currentItem.style.backgroundPosition = 'center';
            currentItem.style.height = '60vh';
            currentItem.onclick = handleDiaryClick;
            boxContent.style.display = 'none';
            showMessage('ฉันบันทึกสิ่งที่ฉันรู้สึกมาตลอดเลยน่ะ ฉันชอบเขียนมันนะ');
        } else {
            currentItem.style.backgroundImage = getComputedStyle(item).backgroundImage;
            currentItem.style.backgroundSize = 'cover';
            currentItem.style.width = '60vw';
            currentItem.style.height = '85vh';
            currentItem.onclick = null;
            boxContent.style.display = 'none';
            showMessage('คุณพบไอเทม แต่ไม่มีอะไรพิเศษ');
        }
    });
});

// ===== DIARY INTERACTION =====
// Handle diary click to cycle through pages
function handleDiaryClick() {
    diaryPageCount = (diaryPageCount + 1) % diaryPages.length;
    currentItem.style.backgroundImage = `url('${diaryPages[diaryPageCount]}')`;

    // Show message about what's found on each page
    if (diaryPageCount === 0) {
        showMessage('หน้าแรกของไดอารี่...');
    } else if (diaryPageCount === 1) {
        showMessage('อิจฉาจัง');
    } else if (diaryPageCount === 2) {
        showMessage('เลข 565 งั้นหรอ??');
    }
}

// ===== IMAGE INTERACTIONS =====
// คลิกที่ภาพในกล่องเพื่อเปิดภาพใหญ่
keyImage.addEventListener('click', () => {
    imageOverlay.style.display = 'flex';
    overlayImage.src = "./asset/image/background/BigRoomNelly/Item/picinbox2.PNG";
    imageToggled = false;
    showMessage('นี่ไงของที่ฉันหาอยู่ ฉันพร้อมแต่งตัวไปงานแล้ว');
});

// คลิกภาพใหญ่เพื่อสลับภาพและปลดล็อค
overlayImage.addEventListener('click', () => {
    if (!imageToggled) {
        overlayImage.src = "./asset/image/background/BigRoomNelly/Item/picinbox2.PNG";
        imageToggled = true;
        hasKey = true;
        doorUnlocked = true;
        showMessage('ประตูปลดล็อคแล้ว!!');
        imageOverlay.style.display = 'none';
        itemOverlay.style.display = 'none';
    }
});

// ===== OVERLAY CONTROLS =====
// Close item overlay
closeItem.addEventListener('click', () => {
    itemOverlay.style.display = 'none';
    boxContent.style.display = 'none';
});

// ===== DOOR INTERACTIONS =====
// Door click event
door.addEventListener('click', () => {
    if (doorUnlocked) {
        showMessage('ไปด่านต่อไปได้เลย!');
        // Add code to transition to next level
        // For now, just reset to home for demonstration
        setTimeout(() => {
            changeScene('dressing-room-scene');
            initDressingRoom();
        }, 1000);
    } else {
        showMessage('ฉันต้องการเครื่องประดับที่ส่งต่อมาตั้งแต่รุ่นยายทวดก่อน..!');
        setTimeout(() => {
            showMessage('ฉันไม่สามารถแต่งตัวได้ ฉันหากิ๊บติดผมอยู่');
        }, 3000); // 2000 มิลลิวินาที = 2 วินาที
    }
});

// ===== COMIC SCENE INTERACTIONS =====
comicScene.addEventListener('click', (e) => {
    console.log('Comic scene clicked, currentPanelIndex:', currentPanelIndex);

    if (currentPanelIndex < comicPanels.length) {
        const nextPanel = document.querySelector(`.comic-panel[data-panel="${currentPanelIndex + 1}"]`);

        if (nextPanel) {
            nextPanel.classList.add('revealed');
            currentPanelIndex++;

            if (currentPanelIndex === comicPanels.length) {
                if (comicInstruction) comicInstruction.textContent = 'คลิก "ไปต่อ" เพื่อดำเนินเรื่องต่อ';

                // 👇 Show the button after all panels are revealed
                comicNextButton.style.display = 'block';
            }
        }
    }
});

comicNextButton.addEventListener('click', () => {
    changeScene('sliding-scene');
    initSlidingScene();
});


// Second door click event - duplicate but kept for compatibility

// ===== SECOND ROOM DOOR INTERACTION =====
// Door click event for second room
secondDoor.addEventListener('click', () => {
    if (secondDoorUnlocked) {
        showMessage('ฉันไม่มั่นใจเลย ว่าฉันควรไปมั้ย!');
        setTimeout(() => {
            // Add your end game logic here, like showing an ending scene
            changeScene('second-dressing-room-scene'); 
            initSecondDressingRoom();// For now, go back to home scene
            hasKey = false;
            doorUnlocked = false;
            hasSecondKey = false;
            secondDoorUnlocked = false;
        }, 2000);
    } else {
        // Show door code input overlay
        doorCodeOverlay.style.display = 'flex';
        doorCodeAttempt = "";
        doorCodeDisplay.textContent = "_ _ _";
        showMessage('ฉันลืมรหัสไปเลย แต่ฉันจดไว้อยู่นะ');
    }
});

// ===== DOOR CODE INTERACTIONS =====
// Door code button click handlers
keypadButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Clear button
        if (button.classList.contains('clear-btn')) {
            doorCodeAttempt = "";
            updateDoorCodeDisplay();
            return;
        }

        // Enter button
        if (button.classList.contains('enter-btn')) {
            checkDoorCode();
            return;
        }

        // Number buttons - only add if we have less than 3 digits
        if (doorCodeAttempt.length < 3) {
            const digit = button.getAttribute('data-num');
            if (digit) {
                doorCodeAttempt += digit;
                updateDoorCodeDisplay();
            }
        }
    });
});

// Function to update the display of the door code
function updateDoorCodeDisplay() {
    let display = "";

    for (let i = 0; i < 3; i++) {
        if (i < doorCodeAttempt.length) {
            display += doorCodeAttempt[i] + " ";
        } else {
            display += "_ ";
        }
    }

    doorCodeDisplay.textContent = display.trim();
}

// Check if the door code is correct
function checkDoorCode() {
    if (doorCodeAttempt === "565") {
        secondDoorUnlocked = true;
        doorCodeOverlay.style.display = 'none';
        showMessage('รหัสผ่านถูกต้อง! ประตูปลดล็อคแล้ว');
        doorCodeContainer.classList.remove('shake');
    } else {
        doorCodeContainer.classList.add('shake');
        setTimeout(() => {
            doorCodeContainer.classList.remove('shake');
            doorCodeAttempt = "";
            updateDoorCodeDisplay();
        }, 500);
        showMessage('รหัสผ่านไม่ถูกต้อง ฉันจดไว้ที่ไหนนะ');
    }
}

// Close door code overlay
closeDoorCode.addEventListener('click', () => {
    doorCodeOverlay.style.display = 'none';
});

// Clear button handler
document.getElementById('door-code-clear').addEventListener('click', () => {
    doorCodeAttempt = "";
    doorCodeDisplay.textContent = "_ _ _";
});

// ===== ROOM SWITCHING =====
// Function to handle room switching
function switchRoom(roomNumber) {
    const firstRoom = document.getElementById('firstRoom');
    const secondRoom = document.getElementById('secondRoom');

    if (roomNumber === 1) {
        firstRoom.style.display = 'block';
        secondRoom.style.display = 'none';
        setupFirstRoomItems();
    } else if (roomNumber === 2) {
        firstRoom.style.display = 'none';
        secondRoom.style.display = 'block';
        setupSecondRoomItems();
    }
}

// ===== DRESSING ROOM SETUP =====
// Modify the initDressingRoom function to properly set up the button event listener
function initDressingRoom() {
    console.log('Initializing dressing room');
    // Set default character
    characterBody.src = './asset/image/background/DressingRoomNelly/DressPreview/Nelly_dress_P_01.png';
    characterHead.src = './asset/image/background/DressingRoomNelly/HeadPreview/Nelly_head_P_01.png';

    // Reset selections
    selectedHead = '';
    selectedBody = '';

    // Remove selected class from all items
    document.querySelectorAll('.clothing-item.selected').forEach(item => {
        item.classList.remove('selected');
    });

    // Make sure the next button is visible
    if (dressingNextButton) {
        dressingNextButton.style.display = 'block';
        console.log('Dressing room next button is visible');
    } else {
        console.error('Dressing next button not found!');
    }

    // Add event listener directly here to ensure it's set when the scene initializes
    dressingNextButton.addEventListener('click', function () {
        console.log('Dressing room next button clicked');


        // Use changeScene function directly instead of setTimeout + manual style changes
        setTimeout(() => {
            changeScene('comic-scene');
            // Reset comic panels for a fresh start
            currentPanelIndex = 0;
            comicPanels.forEach(panel => {
                if (panel.dataset.panel !== "0") {
                    panel.classList.remove('revealed');
                }
            });
            comicNextButton.style.display = 'none';
        }, 1000);
    });
}

// ===== DRESSING ROOM FUNCTIONALITY =====
// Add this function to set up the dressing room interactions
function setupDressingRoom() {
    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and its content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Clothing item selection
    clothingItems.forEach(item => {
        item.addEventListener('click', () => {
            // Check if it's a head or body item
            const headPath = item.getAttribute('data-head');
            const bodyPath = item.getAttribute('data-body');

            if (headPath) {
                // Deselect previously selected head items
                document.querySelectorAll('.clothing-item[data-head].selected').forEach(elem => {
                    elem.classList.remove('selected');
                });

                // Select this item and update character
                item.classList.add('selected');
                selectedHead = headPath;
                characterHead.src = headPath;
                characterHead.style.display = 'block';
                console.log("Updated head to:", headPath); // Debug logging
            } else if (bodyPath) {
                // Deselect previously selected body items
                document.querySelectorAll('.clothing-item[data-body].selected').forEach(elem => {
                    elem.classList.remove('selected');
                });

                // Select this item and update character
                item.classList.add('selected');
                selectedBody = bodyPath;
                characterBody.src = bodyPath;
                console.log("Updated body to:", bodyPath); // Debug logging
            }
        });
    });

    // Update the dressing room next button to transition to comic scene
    dressingNextButton.addEventListener('click', () => {
        setTimeout(() => {
            changeScene('comic-scene');
            comicScene.style.display = 'flex';
            comicScene.classList.add('fade-in');
            dressingRoomScene.style.display = 'none';
        }, 2000);
    });
    // Initialize with default items if needed
    if (characterBody.src === "./asset/image/background/DressingRoomNelly/DressPreview/Nelly_dress_P_01.png" || characterBody.src === window.location.href) {
        // Set default body if none is set
        const defaultBody = document.querySelector('.clothing-item[data-body]');
        if (defaultBody) {
            defaultBody.click();
        }
    }

    if (characterHead.src === "./asset/image/background/DressingRoomNelly/HeadPreview/Nelly_head_P_01.png" || characterHead.src === window.location.href) {
        // Set default head if none is set
        const defaultHead = document.querySelector('.clothing-item[data-head]');
        if (defaultHead) {
            defaultHead.click();
        }
    }
}

// ===== SLIDING SCENE INITIALIZATION =====
function initSlidingScene() {
    // Calculate screen middle on initialization to handle window resizing
    screenMiddle = window.innerWidth / 2;

    // Reset positions
    playerPosition = 0;
    backgroundPosition = 0;
    isPlayerCentered = false;
    endSceneTriggered = false; // เพิ่มการรีเซ็ตตัวแปรนี้ด้วย

    // Reset NPC completion status
    npcsCompleted = {
        npc1: false,
        npc2: false,
        npc3: false
    };

    // Position elements
    slidingPlayer.style.left = playerPosition + 'px';
    slidingBackground.style.left = '0px';
    slidingForeground.style.left = '0px';
    slidingNPCs.style.left = '0px';

    // Reset NPC appearance
    document.querySelectorAll('.npc').forEach(npc => {
        npc.classList.remove('completed');
    });

    // Setup scene with correct display settings
    slidingScene.classList.add('active');
    currentScene = 'sliding-scene';

    // Hide overlays
    dialogueOverlay.classList.add('hidden');
    itemReceivedOverlay.classList.add('hidden');

    console.log('Sliding scene initialized');

    // Add event listeners for NPCs
    setupNPCInteractions();
}

// ===== NPC INTERACTION SETUP =====
function setupNPCInteractions() {
    const npcs = document.querySelectorAll('.npc');

    npcs.forEach(npc => {
        npc.addEventListener('click', () => {
            const npcId = npc.getAttribute('data-npc');
            const npcKey = `npc${npcId}`;

            // Don't start dialogue if already completed
            if (npcsCompleted[npcKey]) return;

            startDialogue(npcKey, npc);
        });
    });

    // Set up dialogue next button
    dialogueNext.addEventListener('click', advanceDialogue);

    // Set up item received close button
    itemReceivedClose.addEventListener('click', () => {
        itemReceivedOverlay.classList.add('hidden');

        // ตรวจสอบว่าได้คุยกับ NPC ครบทุกคนหรือยัง และยังไม่ได้แสดงรางวัลสุดท้าย
        if (npcsCompleted.npc1 && npcsCompleted.npc2 && npcsCompleted.npc3 && !finalItemShown) {
            finalItemShown = true; // ตั้งค่าเป็น true เพื่อไม่ให้แสดงซ้ำ
            showFinalItem(); // แสดงภาพจิ๊กซอว์เมื่อได้ครบทุกชิ้น
        }
    });
}

// ===== DIALOGUE SYSTEM =====
function startDialogue(npcKey, npcElement) {
    // Pause player movement
    keys.ArrowLeft = false;
    keys.ArrowRight = false;
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;

    // Show dialogue overlay
    dialogueOverlay.classList.remove('hidden');
    
    // Make sure the sliding-foreground-layer exists, create if not
    let foregroundLayer = dialogueOverlay.querySelector('.sliding-foreground-layer');
    if (!foregroundLayer) {
        foregroundLayer = document.createElement('div');
        foregroundLayer.className = 'sliding-foreground-layer';
        // Insert as the first child of the dialogue overlay
        dialogueOverlay.insertBefore(foregroundLayer, dialogueOverlay.firstChild);
    }

    // Set current NPC and reset dialogue index
    currentNPC = npcKey;
    currentDialogueIndex = 0;

    // Set portrait based on NPC
    npcPortrait.style.backgroundImage = getComputedStyle(npcElement).backgroundImage;

    // Display first dialogue
    updateDialogueContent();
}

function updateDialogueContent() {
    const dialogue = npcDialogues[currentNPC][currentDialogueIndex];
    npcName.textContent = dialogue.name;
    dialogueText.textContent = dialogue.text;
}

function advanceDialogue() {
    currentDialogueIndex++;

    // Check if dialogue is complete
    if (currentDialogueIndex >= npcDialogues[currentNPC].length) {
        completeDialogue();
    } else {
        updateDialogueContent();
    }
}

function completeDialogue() {
    // Hide dialogue overlay
    dialogueOverlay.classList.add('hidden');

    // Mark NPC as completed
    npcsCompleted[currentNPC] = true;

    // Update NPC appearance
    const npcElement = document.getElementById(currentNPC);
    if (npcElement) {
        npcElement.classList.add('completed');
    }

    // Show item received overlay
    showReceivedItem(currentNPC);
}

// ===== ITEM REWARDS =====
function showReceivedItem(npcKey) {
    // Show item overlay
    itemReceivedOverlay.classList.remove('hidden');

    // Set item image based on which NPC gave it
    const pieceNumber = npcKey.replace('npc', '');
    itemImage.src = `./asset/image/background/walkingroom/jigsawItem1/Puzzle${pieceNumber}.png`;
    itemDescription.textContent = `คุณได้รับเศษภาพ ${pieceNumber} จาก 3!`;
}


function showFinalItem() {
    // แสดงภาพจิ๊กซอว์ที่ประกอบเสร็จแล้ว
    setTimeout(() => {
        itemReceivedOverlay.classList.remove('hidden');
        itemImage.src = './asset/image/background/walkingroom/jigsawItem1/Puzzle4.png';
        itemDescription.textContent = 'ยินดีด้วย! คุณได้รับชิ้นส่วนภาพครบแล้ว!';

        // ลบปุ่มปิดเดิม เพื่อไม่ให้กลับไปรอบวน
        const closeButton = document.getElementById('item-received-close');
        if (closeButton) {
            closeButton.style.display = 'none';
        }

        // สร้างปุ่ม "ไปด่านถัดไป" แบบใหม่
        const nextButton = document.createElement('button');
        nextButton.id = 'sliding-next-button';
        nextButton.setAttribute('aria-label', 'ไปด่านถัดไป');

        // เพิ่มข้อความก่อนไอคอน
        const text = document.createElement('span');
        text.textContent = 'ไปต่อ';
        text.style.marginRight = '10px'; //   
        // Apply styles
        text.style.padding = '8px 8px';
        text.style.color = 'white';
        text.style.fontSize = '20px';
        text.style.fontWeight = 'bold';
        text.style.textShadow = '1px 1px 2px black';
        text.style.display = 'inline-block';
        text.style.verticalAlign = 'middle';
        text.style.fontFamily = 'Issara'; // Make sure the Issara font is loaded
        text.style.marginRight = '10px';  // Spacing before the icon (optional)
        const icon = document.createElement('img');
        icon.src = './asset/image/Button/next yellow.png';
        icon.alt = 'Next';

        nextButton.appendChild(text);
        nextButton.appendChild(icon);

        // เพิ่ม event listener
        nextButton.addEventListener('click', () => {
            itemReceivedOverlay.classList.add('hidden');
            completeSlideScene();
        });

        // เพิ่มปุ่มเข้าไปในโอเวอร์เลย์
        itemReceivedOverlay.appendChild(nextButton);
    }, 1000);
}

// ===== SLIDING SCENE MOVEMENT SYSTEM =====
function moveSlidingPlayer() {
    // Don't proceed if we're not in the sliding scene or dialogue is active
    if (currentScene !== 'sliding-scene' || !dialogueOverlay.classList.contains('hidden')) return;

    // Check if player is at the center point
    const playerCenter = playerPosition + playerOffset;
    isPlayerCentered = playerCenter >= screenMiddle;

    // ตรวจสอบว่าถึงจุดสุดท้ายของ background หรือยัง
    const backgroundEndReached = Math.abs(backgroundPosition) >= (backgroundMaxWidth - window.innerWidth);

    // Move player right
    if (keys.ArrowRight) {
        if (!isPlayerCentered) {
            // Player moves until reaching center
            playerPosition = Math.min(screenMiddle - playerOffset, playerPosition + playerSpeed);
            slidingPlayer.style.left = playerPosition + 'px';

            // Add wiggle effect while moving
            if (!slidingPlayer.classList.contains('wiggle')) {
                slidingPlayer.classList.add('wiggle');
            }
        } else {
            // Background and NPCs move instead of player
            if (!backgroundEndReached) {
                // ยังไม่ถึงจุดสุดท้าย เลื่อน background ตามปกติ
                backgroundPosition -= playerSpeed;
                slidingBackground.style.left = backgroundPosition + 'px';
                slidingForeground.style.left = backgroundPosition + 'px';
                slidingNPCs.style.left = backgroundPosition + 'px';

                // Keep player wiggling as they "walk"
                slidingPlayer.classList.add('wiggle');
            } else {
                // ถึงจุดสุดท้ายแล้ว ตรวจสอบว่าผู้เล่นสะสมของครบแล้วหรือไม่
                if (npcsCompleted.npc1 && npcsCompleted.npc2 && npcsCompleted.npc3) {
                    // ผู้เล่นสะสมไอเทมครบแล้ว แสดงฉากจบหรือไปฉากถัดไป
                    if (!endSceneTriggered) {
                        endSceneTriggered = true;
                        completeSlideScene();
                    }
                } else {
                    // ผู้เล่นยังเก็บไอเทมไม่ครบ แสดงข้อความแจ้งเตือน
                    showMessage('ชั้นยังคุยไม่ครบทุกคนเลย!', 3000);
                }
            }
        }
    }

    // Move player left
    if (keys.ArrowLeft) {
        if (isPlayerCentered && backgroundPosition < 0) {
            // Move background right instead of player if we're centered
            backgroundPosition += playerSpeed;
            backgroundPosition = Math.min(0, backgroundPosition);
            slidingBackground.style.left = backgroundPosition + 'px';
            slidingForeground.style.left = backgroundPosition + 'px';
            slidingNPCs.style.left = backgroundPosition + 'px';

            // Keep player wiggling as they "walk"
            slidingPlayer.classList.add('wiggle');
        } else {
            // Player moves left directly
            playerPosition = Math.max(0, playerPosition - playerSpeed);
            slidingPlayer.style.left = playerPosition + 'px';

            // Reset centered flag if player moves back from center
            if (playerPosition + playerOffset < screenMiddle) {
                isPlayerCentered = false;
            }

            // Add wiggle effect while moving
            if (!slidingPlayer.classList.contains('wiggle')) {
                slidingPlayer.classList.add('wiggle');
            }
        }
    }

    // Stop wiggle if no movement keys are pressed
    if (!keys.ArrowLeft && !keys.ArrowRight) {
        slidingPlayer.classList.remove('wiggle');
    }

    // Continue animation if still moving
    if (keys.ArrowLeft || keys.ArrowRight) {
        animationFrameId = requestAnimationFrame(moveSlidingPlayer);
    } else {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        // Make sure wiggle is removed when animation stops
        slidingPlayer.classList.remove('wiggle');
    }
}

// เพิ่มฟังก์ชันนี้เข้าไปในโค้ด
function completeSlideScene() {
    // แสดงข้อความยินดี
    showMessage('ชุดฉันดูแย่ไปหมด!', 3000);

    // รีเซ็ตตัวแปรสำหรับการเล่นรอบถัดไป
    finalItemShown = false;
    npcsCompleted = {
        npc1: false,
        npc2: false,
        npc3: false
    };

    // รอสักครู่แล้วเปลี่ยนไปยังฉากถัดไป
    setTimeout(() => {
        // เปลี่ยนไปยังฉากถัดไป (อาจเป็นฉากอื่นที่คุณต้องการ)
        changeScene('second-room-scene'); // หรือฉากอื่นที่คุณต้องการไป
    }, 4000);
}

// ===== SCENE TRANSITION =====
// Add a button to transition to the sliding scene
function setupSlidingSceneTransition() {
    const transitionButton = document.getElementById('sliding-scene-transition');
    if (transitionButton) {
        transitionButton.addEventListener('click', () => {
            changeScene('sliding-scene');
            initSlidingScene();
        });
    }
}



// ===== SECOND DRESSING ROOM SETUP =====
function initSecondDressingRoom() {
    console.log('Initializing second dressing room');
    // Set default character
    secondCharacterBody.src = './asset/image/background/DressingRoomOceana/DressPreview/Oceana_dress_P_01.png';
    secondCharacterHead.src = './asset/image/background/DressingRoomOceana/HeadPreview/Oceana_head_P_01.png';

    // Reset selections
    secondSelectedHead = '';
    secondSelectedBody = '';

    // Remove selected class from all items
    document.querySelectorAll('.second-clothing-item.selected').forEach(item => {
        item.classList.remove('selected');
    });

    // Make sure the next button is visible
    if (secondDressingNextButton) {
        secondDressingNextButton.style.display = 'block';
        console.log('Second dressing room next button is visible');
    } else {
        console.error('Second dressing next button not found!');
    }

    // Add event listener directly here to ensure it's set when the scene initializes
    secondDressingNextButton.addEventListener('click', function () {
        console.log('Second dressing room next button clicked');

        // Transition to the end scene or back to home
        setTimeout(() => {
            // You can create a new end scene or just go back to home
            showMessage('ไปห้องต่อไปกันเถอะ!');
            setTimeout(() => {
                changeScene('jigsaw-scene');
                initJigsawScene();
                hasKey = false;
                doorUnlocked = false;
                hasSecondKey = false;
                secondDoorUnlocked = false;
            }, 3000);
        }, 1000);
    });
}

// ===== SECOND DRESSING ROOM FUNCTIONALITY =====
function setupSecondDressingRoom() {
    // Tab switching functionality
    secondTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            secondTabButtons.forEach(btn => btn.classList.remove('active'));
            secondTabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and its content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Clothing item selection
    secondClothingItems.forEach(item => {
        item.addEventListener('click', () => {
            // Check if it's a head or body item
            const headPath = item.getAttribute('data-head');
            const bodyPath = item.getAttribute('data-body');

            if (headPath) {
                // Deselect previously selected head items
                document.querySelectorAll('.second-clothing-item[data-head].selected').forEach(elem => {
                    elem.classList.remove('selected');
                });

                // Select this item and update character
                item.classList.add('selected');
                secondSelectedHead = headPath;
                secondCharacterHead.src = headPath;
                secondCharacterHead.style.display = 'block';
                console.log("Updated second head to:", headPath);
            } else if (bodyPath) {
                // Deselect previously selected body items
                document.querySelectorAll('.second-clothing-item[data-body].selected').forEach(elem => {
                    elem.classList.remove('selected');
                });

                // Select this item and update character
                item.classList.add('selected');
                secondSelectedBody = bodyPath;
                secondCharacterBody.src = bodyPath;
                console.log("Updated second body to:", bodyPath);
            }
        });
    });

    // Initialize with default items if needed
    if (secondCharacterBody.src === "./asset/image/background/DressingRoomNelly/DressPreview/Nelly_dress_P_01.png" || secondCharacterBody.src === window.location.href) {
        // Set default body if none is set
        const defaultBody = document.querySelector('.second-clothing-item[data-body]');
        if (defaultBody) {
            defaultBody.click();
        }
    }

    if (secondCharacterHead.src === "./asset/image/background/DressingRoomNelly/HeadPreview/Nelly_head_P_01.png" || secondCharacterHead.src === window.location.href) {
        // Set default head if none is set
        const defaultHead = document.querySelector('.second-clothing-item[data-head]');
        if (defaultHead) {
            defaultHead.click();
        }
    }
}

// ===== JIGSAW PIECE RESET =====
function resetJigsawPieces() {
    // Remove all pieces from drop zones and return to starting positions
    document.querySelectorAll('.jigsaw-piece').forEach(piece => {
        // Remove from any drop zones
        if (piece.parentElement.classList.contains('jigsaw-drop-zone')) {
            const pieceClone = piece.cloneNode(true);
            jigsawContainer.appendChild(pieceClone);
            piece.remove();
            setupPieceDraggable(pieceClone);
        }
        
        // Reset visual states
        piece.classList.remove('placed');
        
        // Randomize starting positions within the container area
        const containerRect = jigsawContainer.getBoundingClientRect();
        const pieceWidth = piece.offsetWidth;
        const pieceHeight = piece.offsetHeight;
        
        // Calculate random position within container boundaries
        const maxX = containerRect.width - pieceWidth;
        const maxY = containerRect.height - pieceHeight;
        
        // Set random position
        piece.style.position = 'absolute';
        piece.style.left = `${Math.random() * maxX}px`;
        piece.style.top = `${Math.random() * maxY}px`;
    });
}

// ===== JIGSAW SCENE INITIALIZATION =====
function initJigsawScene() {
    console.log('Initializing jigsaw scene');
    
    // Reset jigsaw state
    jigsawComplete = false;
    placedPieces = {
        piece1: false,
        piece2: false,
        piece3: false
    };
    
    // Hide success message and revealed image initially
    if (jigsawSuccess) jigsawSuccess.style.display = 'none';
    if (jigsawRevealedImage) jigsawRevealedImage.style.display = 'none';
    if (jigsawNextButton) jigsawNextButton.style.display = 'none';
    
    // Reset positions of jigsaw pieces
    resetJigsawPieces();
    
    // Setup drag and drop for jigsaw pieces
    setupJigsawInteractions();
    
    // Show instruction message
    showMessage('เรียงต่อชิ้นส่วนภาพที่คุณได้รับมาให้สมบูรณ์!', 5000);
}

// ===== JIGSAW INTERACTIONS SETUP =====
function setupJigsawInteractions() {
    // Setup draggable pieces
    document.querySelectorAll('.jigsaw-piece').forEach(piece => {
        setupPieceDraggable(piece);
    });
    
    // Setup drop zones
    document.querySelectorAll('.jigsaw-drop-zone').forEach(zone => {
        setupDropZone(zone);
    });
}

// Make a piece draggable
function setupPieceDraggable(piece) {
    let isDragging = false;
    let offsetX, offsetY;
    
    // Mouse down event to start dragging
    piece.addEventListener('mousedown', startDrag);
    piece.addEventListener('touchstart', handleTouchStart, { passive: false });
    
    function startDrag(e) {
        e.preventDefault();
        
        // Bring piece to front during drag
        piece.style.zIndex = '100';
        
        // Calculate offset from mouse position to piece corner
        const pieceRect = piece.getBoundingClientRect();
        offsetX = e.clientX - pieceRect.left;
        offsetY = e.clientY - pieceRect.top;
        
        isDragging = true;
        
        // Add global mouse move and up listeners
        document.addEventListener('mousemove', doDrag);
        document.addEventListener('mouseup', stopDrag);
        
        // Add grabbing cursor
        piece.style.cursor = 'grabbing';
    }
    
    function handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        
        // Bring piece to front during drag
        piece.style.zIndex = '100';
        
        // Calculate offset from touch position to piece corner
        const pieceRect = piece.getBoundingClientRect();
        offsetX = touch.clientX - pieceRect.left;
        offsetY = touch.clientY - pieceRect.top;
        
        isDragging = true;
        
        // Add global touch move and end listeners
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
    }
    
    function doDrag(e) {
        if (!isDragging) return;
        
        const containerRect = jigsawContainer.getBoundingClientRect();
        
        // Calculate new position relative to container
        let newX = e.clientX - containerRect.left - offsetX;
        let newY = e.clientY - containerRect.top - offsetY;
        
        // Constrain to container boundaries
        newX = Math.max(0, Math.min(newX, containerRect.width - piece.offsetWidth));
        newY = Math.max(0, Math.min(newY, containerRect.height - piece.offsetHeight));
        
        // Update position
        piece.style.left = `${newX}px`;
        piece.style.top = `${newY}px`;
    }
    
    function handleTouchMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        const touch = e.touches[0];
        const containerRect = jigsawContainer.getBoundingClientRect();
        
        // Calculate new position relative to container
        let newX = touch.clientX - containerRect.left - offsetX;
        let newY = touch.clientY - containerRect.top - offsetY;
        
        // Constrain to container boundaries
        newX = Math.max(0, Math.min(newX, containerRect.width - piece.offsetWidth));
        newY = Math.max(0, Math.min(newY, containerRect.height - piece.offsetHeight));
        
        // Update position
        piece.style.left = `${newX}px`;
        piece.style.top = `${newY}px`;
    }
    
    function stopDrag() {
        if (!isDragging) return;
        
        isDragging = false;
        
        // Reset z-index
        piece.style.zIndex = '10';
        
        // Check if piece is over any drop zone
        checkDropZones(piece);
        
        // Remove global listeners
        document.removeEventListener('mousemove', doDrag);
        document.removeEventListener('mouseup', stopDrag);
        
        // Reset cursor
        piece.style.cursor = 'grab';
    }
    
    function handleTouchEnd() {
        if (!isDragging) return;
        
        isDragging = false;
        
        // Reset z-index
        piece.style.zIndex = '10';
        
        // Check if piece is over any drop zone
        checkDropZones(piece);
        
        // Remove global listeners
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    }
    
    // Initial cursor style
    piece.style.cursor = 'grab';
}

// Setup drop zone behavior
function setupDropZone(zone) {
    // Visual feedback on hover - handled by CSS
    zone.classList.add('drop-zone-ready');
}

// Check if a piece is over its correct drop zone
function checkDropZones(piece) {
    const pieceId = piece.getAttribute('data-piece-id');
    const pieceRect = piece.getBoundingClientRect();
    
    // Get center point of piece
    const pieceCenterX = pieceRect.left + pieceRect.width / 2;
    const pieceCenterY = pieceRect.top + pieceRect.height / 2;
    
    // Check all drop zones
    let placed = false;
    document.querySelectorAll('.jigsaw-drop-zone').forEach(zone => {
        const zoneId = zone.getAttribute('data-zone-id');
        const zoneRect = zone.getBoundingClientRect();
        
        // Check if piece center is within this zone
        if (
            pieceCenterX >= zoneRect.left &&
            pieceCenterX <= zoneRect.right &&
            pieceCenterY >= zoneRect.top &&
            pieceCenterY <= zoneRect.bottom
        ) {
            // Check if this is the correct zone for this piece
            if (pieceId === zoneId) {
                placePieceInZone(piece, zone);
                placed = true;
                
                // Mark piece as placed
                placedPieces[pieceId] = true;
                
                // Check if puzzle is complete
                checkJigsawCompletion();
            } else {
                // Wrong zone - shake the piece
                piece.classList.add('shake');
                setTimeout(() => {
                    piece.classList.remove('shake');
                }, 500);
            }
        }
    });
    
    return placed;
}

// Place a piece in its drop zone
function placePieceInZone(piece, zone) {
    // Clone piece and add to zone
    const pieceClone = piece.cloneNode(true);
    zone.appendChild(pieceClone);
    
    // Style the placed piece
    pieceClone.style.position = 'absolute';
    pieceClone.style.left = '0';
    pieceClone.style.top = '0';
    pieceClone.classList.add('placed');
    
    // Remove original piece
    piece.remove();
    
    // Play sound effect
    const placementSound = document.getElementById('jigsaw-place-sound');
    if (placementSound) {
        placementSound.currentTime = 0;
        placementSound.play();
    }
}

// Check if the jigsaw puzzle is complete
function checkJigsawCompletion() {
    if (placedPieces.piece1 && placedPieces.piece2 && placedPieces.piece3) {
        jigsawComplete = true;
        
        // Show success animation with slight delay

            // Show success message
            if (jigsawSuccess) 
                setTimeout(() => {jigsawSuccess.style.display = 'block';},1000);
            setTimeout(() => {
            // Show full image with fade-in effect
            if (jigsawRevealedImage) {
                jigsawRevealedImage.style.display = 'block';
                jigsawRevealedImage.classList.add('fade-in');
            }
            
            // Play completion sound
            const completionSound = document.getElementById('jigsaw-complete-sound');
            if (completionSound) {
                completionSound.play();
            }
            
            // Show next button for a moment to allow user to see the completed puzzle
            if (jigsawNextButton) {
                jigsawNextButton.style.display = 'block';
            }
            
            // Transition to cutscene after a short delay
            setTimeout(() => {
                changeScene('cutscene-2');
                
                // Make sure next button is hidden when entering cutscene
                if (cutscene2NextButton) {
                    cutscene2NextButton.style.display = 'none';
                }
                
                // Play the video and let the 'ended' event handle showing the button
                if (cutscene2VideoPlayer) {
                    cutscene2VideoPlayer.currentTime = 0; // Reset video position
                    cutscene2VideoPlayer.play();
                }
                
                showMessage('ชุดฉันไม่ต้องแพงก็ได้นี่ ถ้าฉันใส่แล้วสวย!', 3000);
            }, 7000); // Short delay before switching to cutscene
        }, 1000);
    }
}

// Update the handleJigsawNextButtonClick function
// function handleJigsawNextButtonClick() {
//     console.log('Jigsaw next button clicked, transitioning to cutscene-2');
//     changeScene('cutscene-2');
    
//     // Start playing the video
//     if (cutscene2VideoPlayer) {
//         cutscene2VideoPlayer.play();
        
//         // Hide the next button until video ends
//         if (cutscene2NextButton) {
//             cutscene2NextButton.style.display = 'none';
//         }
//     }
// }

// jigsawNextButton.addEventListener('click', () => {
//     // Transition from jigsaw scene to the second cutscene
//     changeScene('cutscene-2');
//     // Start playing the video automatically
//     cutscene2VideoPlayer.play();
// });

// cutscene2VideoPlayer.addEventListener('ended', () => {
//     cutscene2NextButton.style.display = 'block';
// });

// // Click event for the next button after cutscene 2
// cutscene2NextButton.addEventListener('click', () => {
//     // Determine which scene should come after cutscene 2
//     // This could be the sliding scene or any other scene in your game flow
//     changeScene('home-scene'); // Replace with the appropriate next scene
    
//     // Reset the button display state for next time
//     cutscene2NextButton.style.display = 'none';
// });