

// Game variables
let currentScene = 'home-scene';
let hasKey = false;
let doorUnlocked = false;
let hasSecondKey = false;
let secondDoorUnlocked = false;

// Scene elements
const homeScene = document.getElementById('home-scene');
const cutscene1 = document.getElementById('cutscene-1');
const roomScene = document.getElementById('room-scene');
const comicScene = document.getElementById('comic-scene');
const secondRoomScene = document.getElementById('second-room-scene'); // Make sure this exists


// Video elements
const videoPlayer = document.getElementById('video-player');
const nextButton = document.getElementById('next-button');

// Room elements
const player = document.getElementById('player');
const secondPlayer = document.getElementById('second-player'); // Player in the second room
const items = document.querySelectorAll('.item');
const secondRoomItems = document.querySelectorAll('.second-room-item'); // Items in the second room
const door = document.getElementById('door');
const secondDoor = document.getElementById('second-door'); // Door in the second room
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
let imageToggled = false;     


//comin Scene
const comicPanels = document.querySelectorAll('.comic-panel');
const comicInstruction = document.querySelector('.comic-instruction');
let currentPanelIndex = 0;

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
    // Hide all scenes first
    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.remove('active');
    });

    // Then show only the home scene
    homeScene.classList.add('active');
    currentScene = 'home-scene';

    // Initialize video
    // In real code, replace with the actual video URL
    videoPlayer.src = "/asset/video/Repo.mp4";

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

    console.log('Game initialized, current scene:', currentScene);
});

// Change scene function
function changeScene(sceneId) {
    // Hide all scenes
    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.remove('active');
    });

    // Show the requested scene
    document.getElementById(sceneId).classList.add('active');
    currentScene = sceneId;

    console.log('Changed to scene:', sceneId);

    if (sceneId === 'cutscene-1') {
        videoPlayer.play();
        nextButton.style.display = 'none'; // Hide next button until video ends
    }
}

// Show message function
function showMessage(message, duration = 3000) {
    gameMessage.textContent = message;
    gameMessage.style.display = 'block';

    setTimeout(() => {
        gameMessage.style.display = 'none';
    }, duration);
}

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

// Player movement
let keys = { ArrowLeft: false, ArrowRight: false };
let playerSpeed = 4; // Your speed
let animationFrameId = null;

document.addEventListener('keydown', (e) => {
    if (currentScene !== 'room-scene') return;

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
        }
    }
});

function movePlayer() { 
    // Select the correct player based on the current scene
    const activePlayer = currentScene === 'room-scene' ? player : secondPlayer;
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

    // Continue if any key is held
    if (keys.ArrowLeft || keys.ArrowRight) {
        animationFrameId = requestAnimationFrame(movePlayer);
    } else {
        animationFrameId = null;
    }
}


// Item click events
items.forEach((item) => {
    item.addEventListener('click', () => {
        itemOverlay.style.display = 'flex';

        if (item.id === 'item3') { // กล่อง
            currentItem.style.backgroundImage = "url('/asset/image/background/BigRoomNelly/Item/ToyOpen.PNG')"; // เปลี่ยนภาพกล่อง
            currentItem.style.backgroundSize = 'cover';
            currentItem.style.width = '60vw';
            currentItem.style.height = '85vh';

            currentItem.onclick = () => {
                boxContent.style.display = 'flex';
                showMessage('โอ๊ะ!! เจอรูปภาพข้างใน');
            };
        } else if (item.id === 'item2') { // ไอเทม 2
            currentItem.style.backgroundImage = "url('/asset/image/background/BigRoomNelly/Item/Board2.PNG')"; // เปลี่ยนภาพเฉพาะใน overlay
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

// Item click events for second room
secondRoomItems.forEach((item) => {
    item.addEventListener('click', () => {
        itemOverlay.style.display = 'flex';

        if (item.id === 'second-item1') { // กระจกเงา
            currentItem.style.backgroundImage = "url('/asset/image/background/SecondRoom/Item/Mirror.PNG')";
            currentItem.style.backgroundSize = 'cover';
            currentItem.style.width = '500px';
            currentItem.style.height = '500px';
            currentItem.onclick = null;
            boxContent.style.display = 'none';
            showMessage('คุณพบกระจกเงาแตกร้าว');
        } else if (item.id === 'second-item2') { // หนังสือ
            currentItem.style.backgroundImage = "url('/asset/image/background/SecondRoom/Item/Book.PNG')";
            currentItem.style.backgroundSize = 'cover';
            currentItem.style.width = '500px';
            currentItem.style.height = '500px';
            
            currentItem.onclick = () => {
                boxContent.style.display = 'flex';
                keyImage.src = "asset/image/background/SecondRoom/Item/BookPage.PNG";
                showMessage('คุณเปิดหนังสือและพบบางอย่าง');
            };
        } else if (item.id === 'second-item3') { // โต๊ะทำงาน
            currentItem.style.backgroundImage = "url('/asset/image/background/SecondRoom/Item/Desk.PNG')";
            currentItem.style.backgroundSize = 'cover';
            currentItem.style.width = '60vw';
            currentItem.style.height = '85vh';
            currentItem.onclick = null;
            
            if (!hasSecondKey) {
                currentItem.onclick = () => {
                    hasSecondKey = true;
                    secondDoorUnlocked = true;
                    showMessage('คุณพบกุญแจ! ประตูปลดล็อคแล้ว');
                };
            } else {
                boxContent.style.display = 'none';
                showMessage('คุณตรวจสอบโต๊ะทำงานแล้ว ไม่มีอะไรอีก');
            }
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

// คลิกที่ภาพในกล่องเพื่อเปิดภาพใหญ่
keyImage.addEventListener('click', () => {
    imageOverlay.style.display = 'flex';
    overlayImage.src = "asset/image/background/BigRoomNelly/Item/picinbox2.PNG";
    imageToggled = false;
    showMessage('โอ๊ะ!! มีอีกภาพนึง');
});

// คลิกภาพใหญ่เพื่อสลับภาพและปลดล็อค
overlayImage.addEventListener('click', () => {
    if (!imageToggled) {
        overlayImage.src = "asset/image/background/BigRoomNelly/Item/picinbox2.PNG";
        imageToggled = true;
        hasKey = true;
        doorUnlocked = true;
        showMessage('คุณเจอรูปพิเศษ! ประตูปลดล็อคแล้ว');
        imageOverlay.style.display = 'none';
        itemOverlay.style.display = 'none';
    }
});

// Close item overlay
closeItem.addEventListener('click', () => {
    itemOverlay.style.display = 'none';
    boxContent.style.display = 'none';
});

// Door click event
door.addEventListener('click', () => {
    if (doorUnlocked) {
        showMessage('ไปด่านต่อไปได้เลย!');
        // Add code to transition to next level
        // For now, just reset to home for demonstration
        setTimeout(() => {
            changeScene('comic-scene');
            comicScene.style.display = 'flex';
            comicScene.classList.add('fade-in');
        }, 2000);
    } else {
        showMessage('ประตูล็อกอยู่ คุณต้องหาบางอย่างเพื่อปลดล็อค');
    }
});

// Door click event for second room
secondDoor.addEventListener('click', () => {
    if (secondDoorUnlocked) {
        showMessage('ยินดีด้วย! คุณผ่านเกมแล้ว!');
        setTimeout(() => {
            // Add your end game logic here, like showing an ending scene
            changeScene('ending-scene'); // You'll need to create this scene
        }, 2000);
    } else {
        showMessage('ประตูล็อกอยู่ คุณต้องหาบางอย่างเพื่อปลดล็อค');
    }
});

// Improved comic panel reveal logic
comicScene.addEventListener('click', (e) => {
    console.log('Comic scene clicked, currentPanelIndex:', currentPanelIndex);
    
    if (currentPanelIndex < comicPanels.length) {
        const nextPanel = document.querySelector(`.comic-panel[data-panel="${currentPanelIndex + 1}"]`);
        
        if (nextPanel) {
            nextPanel.classList.add('revealed');
            currentPanelIndex++;
            
            // Check if all panels are revealed
            if (currentPanelIndex === comicPanels.length) {
                if (comicInstruction) comicInstruction.textContent = 'คลิกที่ไหนก็ได้เพื่อไปต่อ';
                
                // Force transition after a small delay to avoid click conflicts
                setTimeout(() => {
                    comicScene.onclick = function(event) {
                        event.stopPropagation();
                        console.log('Final click detected, transitioning to second room');
                        changeScene('second-room-scene');
                    };
                }, 500);
            }
        }
    }
});