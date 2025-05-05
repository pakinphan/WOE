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

// NPC dialogue data
const npcDialogues = {
    npc1: [
        { name: "Marsha", text: "Welcome, traveler! Our village has been waiting for someone like you." },
        { name: "Marsha", text: "We need your help to solve an ancient puzzle that protects our sacred treasure." },
        { name: "Marsha", text: "Here is the first piece of the jigsaw. Find the other two to unlock the secret." }
    ],
    npc2: [
        { name: "Myria", text: "Ah, a seeker of the ancient puzzle, I see..." },
        { name: "Myria", text: "Many have tried to collect all the pieces, but failed." },
        { name: "Myria", text: "Take this piece. May fortune favor your quest." }
    ],
    npc3: [
        { name: "Guardian of Secrets", text: "Halt! Only those worthy may proceed beyond this point." },
        { name: "Guardian of Secrets", text: "You've proven your determination by finding me." },
        { name: "Guardian of Secrets", text: "The final piece is yours. Complete the puzzle to reveal the truth." }
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
let playerSpeed = 4; // Your speed
let animationFrameId = null;

// ===== CHARACTER CUSTOMIZATION =====
// Selected items tracking
let selectedHead = '';
let selectedBody = '';

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

    // Make sure dressing room is explicitly hidden
    const dressingRoomScene = document.getElementById('dressing-room-scene');
    if (dressingRoomScene) {
        setupDressingRoom();
        dressingRoomScene.classList.remove('active');
        dressingRoomScene.style.display = 'none';
        console.log('Dressing room explicitly hidden');
    }


    // Log all scenes and their display states
    document.querySelectorAll('.scene').forEach(scene => {
        console.log(`Scene ${scene.id}: display=${getComputedStyle(scene).display}, classList=${scene.classList}`);
    });

    // Initialize video
    videoPlayer.src = "./asset/video/Repo.mp4";

    // For testing only - simulate video end after 2 seconds
    // Remove this in production
    setTimeout(() => {
        const videoEndedEvent = new Event('ended');
        videoPlayer.dispatchEvent(videoEndedEvent);
    }, 2000);

    // Show key in the box
    keyItem.style.display = 'block';

    // Hide elements that should be hidden initially
    nextButton.style.display = 'none';
    itemOverlay.style.display = 'none';
    boxContent.style.display = 'none';
    gameMessage.style.display = 'none';
    doorCodeOverlay.style.display = 'none';

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
            currentItem.style.width = '60vw';
            currentItem.style.height = '85vh';

            currentItem.onclick = () => {
                boxContent.style.display = 'flex';
                showMessage('โอ๊ะ!! เจอรูปภาพข้างใน');
            };
        } else if (item.id === 'item2') { // ไอเทม 2
            currentItem.style.backgroundImage = "url('./asset/image/background/BigRoomNelly/Item/Board2.PNG')"; // เปลี่ยนภาพเฉพาะใน overlay
            currentItem.style.backgroundSize = 'cover';
            currentItem.style.width = '500px';
            currentItem.style.height = '500px';
            currentItem.onclick = null;
            boxContent.style.display = 'none';
            showMessage('คุณพบกระดาน');
        } else {
            currentItem.style.backgroundImage = getComputedStyle(item).backgroundImage;
            currentItem.style.backgroundSize = 'cover';
            currentItem.style.width = '500px';
            currentItem.style.height = '500px';
            currentItem.onclick = null;
            boxContent.style.display = 'none';
            showMessage('คุณพบไอเทม แต่ไม่มีอะไรพิเศษ');
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

            currentItem.style.height = '500px';
            currentItem.onclick = null;
            boxContent.style.display = 'none';
            showMessage('โอ๊ะ!! ในภาพมีตัวเลข 5 ช่างแปลกจัง');
        } else if (item.id === 'second-item2') {
            // Initialize diary viewing
            diaryPageCount = 0;
            currentItem.style.backgroundImage = `url('${diaryPages[diaryPageCount]}')`;
            currentItem.style.backgroundSize = 'cover';
            currentItem.style.height = '500px';
            currentItem.onclick = handleDiaryClick;
            boxContent.style.display = 'none';
            showMessage('คุณพบไดอารี่ ลองคลิกเพื่ออ่านต่อ');
        } else {
            currentItem.style.backgroundImage = getComputedStyle(item).backgroundImage;
            currentItem.style.backgroundSize = 'cover';
            currentItem.style.width = '500px';
            currentItem.style.height = '500px';
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
        showMessage('');
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
    showMessage('โอ๊ะ!! มีอีกภาพนึง');
});

// คลิกภาพใหญ่เพื่อสลับภาพและปลดล็อค
overlayImage.addEventListener('click', () => {
    if (!imageToggled) {
        overlayImage.src = "./asset/image/background/BigRoomNelly/Item/picinbox2.PNG";
        imageToggled = true;
        hasKey = true;
        doorUnlocked = true;
        showMessage('คุณเจอรูปพิเศษ! ประตูปลดล็อคแล้ว');
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
        }, 2000);
    } else {
        showMessage('ประตูล็อกอยู่ คุณต้องหาบางอย่างเพื่อปลดล็อค');
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
door.addEventListener('click', () => {
    if (doorUnlocked) {
        showMessage('ไปด่านต่อไปได้เลย!');
        // Add code to transition to next level
        // For now, just reset to home for demonstration
        setTimeout(() => {
            changeScene('dressing-room-scene');
        }, 2000);
    } else {
        showMessage('ประตูล็อกอยู่ คุณต้องหาบางอย่างเพื่อปลดล็อค');
    }
});

// ===== SECOND ROOM DOOR INTERACTION =====
// Door click event for second room
secondDoor.addEventListener('click', () => {
    if (secondDoorUnlocked) {
        showMessage('ยินดีด้วย! คุณผ่านเกมแล้ว!');
        setTimeout(() => {
            // Add your end game logic here, like showing an ending scene
            changeScene('home-scene'); // For now, go back to home scene
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
        showMessage('ประตูล็อกอยู่ กรุณาใส่รหัสผ่าน');
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
        showMessage('รหัสผ่านไม่ถูกต้อง ลองอีกครั้ง');
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
    itemImage.src = `./asset/image/items/jigsaw_piece${pieceNumber}.png`;
    itemDescription.textContent = `คุณได้รับเศษภาพ ${pieceNumber} จาก 3!`;
}

function showFinalItem() {
    // แสดงภาพจิ๊กซอว์ที่ประกอบเสร็จแล้ว
    setTimeout(() => {
        itemReceivedOverlay.classList.remove('hidden');
        itemImage.src = './asset/image/items/jigsaw.png';
        itemDescription.textContent = 'ยินดีด้วย! คุณได้รับชิ้นส่วนภาพครบแล้ว!';

        // ลบปุ่มปิดเดิม เพื่อไม่ให้กลับไปรอบวน
        const closeButton = document.getElementById('item-received-close');
        if (closeButton) {
            closeButton.style.display = 'none';
        }

        // สร้างปุ่ม "ไปด่านถัดไป" แบบใหม่
        const nextButton = document.createElement('button');
        nextButton.id = 'dressing-next-button';
        nextButton.setAttribute('aria-label', 'ไปด่านถัดไป');

        // เพิ่มรูปไอคอนลงในปุ่ม
        const icon = document.createElement('img');
        icon.src = './asset/image/ui/arrow-right.png'; // ปรับ path ตามจริง
        icon.alt = 'Next';

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

function showFinalItem() {
    // แสดงภาพจิ๊กซอว์ที่ประกอบเสร็จแล้ว
    setTimeout(() => {
        itemReceivedOverlay.classList.remove('hidden');
        itemImage.src = './asset/image/items/jigsaw.png';
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
                    showMessage('คุณต้องพูดคุยกับตัวละครทั้งหมดก่อนไปต่อ!', 3000);
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
    showMessage('ยินดีด้วย! คุณผ่านด่านนี้แล้ว!', 3000);

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



// ===== INITIALIZATION =====
// Call this when the page loads
document.addEventListener('DOMContentLoaded', function () {
    // Setup first room by default
    setupFirstRoomItems();
    setupDressingRoom();
    setupSlidingSceneTransition();
    // Setup room transition events if they exist
    const roomTransitionButtons = document.querySelectorAll('.room-transition');
    roomTransitionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetRoom = parseInt(button.getAttribute('data-room'));
            switchRoom(targetRoom);
        });
    });

    // Alternatively, set up both rooms' items right away
    setupSecondRoomItems();
});

