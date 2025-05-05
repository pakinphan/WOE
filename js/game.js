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
const blueScreen = document.getElementById('blue-screen');
const blueScreenNextButton = document.getElementById('blue-screen-next-button');

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
    // Allow movement in both room scenes
    if (currentScene !== 'room-scene' && currentScene !== 'second-room-scene') return;

    if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !keys[e.key]) {
        keys[e.key] = true;
        if (!animationFrameId) movePlayer();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        keys[e.key] = false;

        // Stop movement if both keys are up
        if (!keys.ArrowLeft && !keys.ArrowRight) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;

            const activePlayer = currentScene === 'room-scene' ? player : secondPlayer;
            if (activePlayer) {
                activePlayer.classList.remove('wiggle');
            }
        }
    }
});

function movePlayer() {
    // Select the correct player based on the current scene
    const activePlayer = currentScene === 'room-scene' ? player : secondPlayer;

    // Debug to check if activePlayer is correctly selected
    console.log('Current scene:', currentScene);
    console.log('Active player:', activePlayer ? activePlayer.id : 'not found');

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

    // Debug player position
    console.log('Player position:', newLeft);

    // Continue if any key is held
    if (keys.ArrowLeft || keys.ArrowRight) {
        animationFrameId = requestAnimationFrame(movePlayer);
    } else {
        animationFrameId = null;
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
    changeScene('blue-screen');
});

blueScreenNextButton.addEventListener('click', () => {
    changeScene('second-room-scene');
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
    dressingNextButton.addEventListener('click', function() {
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

// ===== INITIALIZATION =====
// Call this when the page loads
document.addEventListener('DOMContentLoaded', function () {
    // Setup first room by default
    setupFirstRoomItems();
    setupDressingRoom();

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

