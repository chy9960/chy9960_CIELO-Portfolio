/////-----------Home----------/////

document.addEventListener('DOMContentLoaded', function() {
    // 'Home' 링크 요소 선택
    const homeLink = document.querySelector('nav a[href="#header"]');
  
    // 'Home' 링크에 클릭 이벤트 추가
    if (homeLink) {
      homeLink.addEventListener('click', function(event) {
        event.preventDefault(); // 링크의 기본 동작 방지 (페이지 이동 방지)
        window.location.reload(); // 페이지 새로 고침
      });
    }

    // 'logo_a' 이미지 요소 선택
    const logoImage = document.querySelector('.logo_a');

    // 'logo_a' 이미지에 클릭 이벤트 추가
    if (logoImage) {
        logoImage.addEventListener('click', function(event) {
            event.preventDefault(); // 기본 동작 방지 (링크 이동 방지)
            window.location.href = window.location.href; // 페이지 새로 고침
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // 하단바 숨기기
    var footer = document.querySelector('footer'); // 또는 적절한 선택자 사용
    if (footer) {
        footer.style.display = 'none';
    }

    // 페이지 로드 시 좌우 폭 유지
    function maintainViewport() {
        document.body.style.overflowX = 'hidden'; // 수평 스크롤 숨기기
    }

    maintainViewport();
});


/////--------About Us - See, Hello-------/////

document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll('.tab-links');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function() {
            tabLinks.forEach(link => link.classList.remove('active-link')); // 기존 활성화된 링크에서 클래스 제거
            this.classList.add('active-link'); // 현재 클릭된 링크에 클래스 추가
        });
    });
});



/////-------------효과--------------/////



let bubbles = [];
let cursorElement;
let cursorVisible = true;

function setup() {
  let canvas = createCanvas(windowWidth, document.body.scrollHeight);
  canvas.position(0, 0);
  canvas.style('pointer-events', 'none');
  canvas.style('z-index', '10');
  canvas.style('opacity', '0.5');

  for (let i = 0; i < 50; i++) {
    bubbles.push(new Bubble());
  }

  // 커서 요소를 생성하고 문서에 추가
  cursorElement = createDiv('');
  cursorElement.addClass('cursor');
  cursorElement.style('position', 'fixed');
  cursorElement.style('pointer-events', 'none');

  // 전체 문서에서 마우스 나가면 커서를 숨기기
  document.addEventListener('mouseleave', () => {
    cursorVisible = false;
    cursorElement.style('display', 'none');
  });

  document.addEventListener('mouseenter', () => {
    cursorVisible = true;
    cursorElement.style('display', 'block');
  });
}

function draw() {
  clear();
  for (let bubble of bubbles) {
    bubble.move();
    bubble.show();
  }
}

// 창 크기 변경 시 캔버스 크기 조정
function windowResized() {
  resizeCanvas(windowWidth, document.body.scrollHeight);
}

// 물방울 클래스 정의
class Bubble {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(10, 60);
    this.speed = random(0.5, 1.5);
    this.direction = random(TWO_PI);
  }
  
  move() {
    this.x += this.speed * cos(this.direction);
    this.y += this.speed * sin(this.direction);
    
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;
  }
  
  show() {
    noStroke();
    fill('#f5f5f5');
    ellipse(this.x, this.y, this.size);
  }
}

// 마우스 움직임에 따라 커서 위치 업데이트
function mouseMoved() {
  if (cursorVisible) {
    cursorElement.position(mouseX, mouseY);
  }
}

// 활성화된 커서 효과
function mouseOver() {
  cursorElement.addClass('active');
}

function mouseOut() {
  cursorElement.removeClass('active');
}