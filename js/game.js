
        // Game variables
        let currentScene = 'home-scene';
        let hasKey = false;
        let doorUnlocked = false;

        // Scene elements
        const homeScene = document.getElementById('home-scene');
        const cutscene1 = document.getElementById('cutscene-1');
        const roomScene = document.getElementById('room-scene');

        // Video elements
        const videoPlayer = document.getElementById('video-player');
        const nextButton = document.getElementById('next-button');

        // Room elements
        const player = document.getElementById('player');
        const items = document.querySelectorAll('.item');
        const door = document.getElementById('door');
        const itemOverlay = document.getElementById('item-overlay');
        const itemDisplay = document.getElementById('item-display');
        const closeItem = document.getElementById('close-item');
        const currentItem = document.getElementById('current-item');
        const boxContent = document.getElementById('box-content');
        const keyItem = document.getElementById('key-item');
        const gameMessage = document.getElementById('game-message');

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
            const playerPos = parseInt(getComputedStyle(player).left);
            const gameWidth = document.body.clientWidth;
            const playerWidth = player.offsetWidth;
            let newLeft = playerPos;
        
            if (keys.ArrowLeft) {
                newLeft = Math.max(0, playerPos - playerSpeed);
            }
            if (keys.ArrowRight) {
                newLeft = Math.min(gameWidth - playerWidth, playerPos + playerSpeed);
            }
        
            player.style.left = newLeft + 'px';
        
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
                
                if (item.id === 'item3') { // Box item
                    currentItem.style.backgroundColor = '#8D6E63';
                    currentItem.style.width = '300px';
                    currentItem.style.height = '300px';
                    
                    // Make the box clickable to open
                    currentItem.onclick = () => {
                        boxContent.style.display = 'flex';
                        showMessage('คุณพบกล่อง คลิกเพื่อเปิด');
                    };
                } else {
                    currentItem.style.backgroundColor = getComputedStyle(item).backgroundColor;
                    currentItem.style.width = '300px';
                    currentItem.style.height = '300px';
                    currentItem.onclick = null;
                    boxContent.style.display = 'none';
                    showMessage('คุณพบไอเทม แต่ไม่มีอะไรพิเศษ');
                }
            });
        });

        // Box key item click event
        keyItem.addEventListener('click', () => {
            hasKey = true;
            keyItem.style.display = 'none';
            showMessage('คุณได้รับกุญแจประตู!');
            itemOverlay.style.display = 'none';
            doorUnlocked = true;
        });

        // Close item overlay
        closeItem.addEventListener('click', () => {
            itemOverlay.style.display = 'none';
            boxContent.style.display = 'none';
        });

        // Door click event
        door.addEventListener('click', () => {
            if (doorUnlocked) {
                showMessage('คุณผ่านไปด่านต่อไป!');
                // Add code to transition to next level
                // For now, just reset to home for demonstration
                setTimeout(() => {
                    changeScene('home-scene');
                }, 2000);
            } else {
                showMessage('ประตูล็อกอยู่ คุณต้องหากุญแจก่อน');
            }
        });
