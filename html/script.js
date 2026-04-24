const input = document.getElementById('image-input');
const imageList = document.getElementById('image-list');
const status = document.getElementById('status');
const track = document.getElementById('track');
const dots = document.getElementById('dots');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const ACCEPTED_TYPES = new Set(['image/webp', 'image/gif', 'image/png', 'image/jpeg']);
const images = [];
let currentIndex = 0;

input.addEventListener('change', (event) => {
  const files = Array.from(event.target.files || []);

  if (files.length === 0) {
    return;
  }

  const invalid = files.filter((file) => !ACCEPTED_TYPES.has(file.type));
  if (invalid.length > 0) {
    const names = invalid.map((file) => file.name).join(', ');
    status.textContent = `Some files were skipped because they are not supported: ${names}`;
  }

  const accepted = files.filter((file) => ACCEPTED_TYPES.has(file.type));
  accepted.forEach((file) => {
    const objectUrl = URL.createObjectURL(file);
    images.push({
      id: crypto.randomUUID(),
      name: file.name,
      type: file.type,
      objectUrl,
    });
  });

  if (accepted.length > 0) {
    status.textContent = `${images.length} image(s) ready for the carousel.`;
    render();
  }

  input.value = '';
});

prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

function goTo(index) {
  if (images.length === 0) {
    currentIndex = 0;
    return;
  }

  currentIndex = Math.max(0, Math.min(index, images.length - 1));
  updateCarouselPosition();
  updateDots();
  updateButtons();
}

function removeImage(id) {
  const idx = images.findIndex((image) => image.id === id);
  if (idx === -1) {
    return;
  }

  URL.revokeObjectURL(images[idx].objectUrl);
  images.splice(idx, 1);

  if (currentIndex >= images.length) {
    currentIndex = Math.max(0, images.length - 1);
  }

  status.textContent =
    images.length > 0
      ? `${images.length} image(s) ready for the carousel.`
      : 'No images uploaded yet.';

  render();
}

function render() {
  renderList();
  renderSlides();
  renderDots();
  updateCarouselPosition();
  updateButtons();
}

function renderList() {
  imageList.innerHTML = '';

  images.forEach((image, index) => {
    const li = document.createElement('li');
    const label = document.createElement('span');
    label.textContent = `${index + 1}. ${image.name} (${humanType(image.type)})`;

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Remove';
    button.addEventListener('click', () => removeImage(image.id));

    li.append(label, button);
    imageList.append(li);
  });
}

function renderSlides() {
  track.innerHTML = '';

  if (images.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'slide';
    empty.innerHTML = '<div style="display:grid;place-items:center;height:100%;color:#8f9ab1;">Upload images to preview the carousel</div>';
    track.append(empty);
    return;
  }

  images.forEach((image) => {
    const slide = document.createElement('div');
    slide.className = 'slide';

    const img = document.createElement('img');
    img.src = image.objectUrl;
    img.alt = image.name;

    slide.append(img);
    track.append(slide);
  });
}

function renderDots() {
  dots.innerHTML = '';

  images.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
    if (idx === currentIndex) {
      dot.classList.add('active');
    }

    dot.addEventListener('click', () => goTo(idx));
    dots.append(dot);
  });
}

function updateDots() {
  [...dots.children].forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentIndex);
  });
}

function updateCarouselPosition() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function updateButtons() {
  const hasMultiple = images.length > 1;
  prevBtn.disabled = !hasMultiple || currentIndex === 0;
  nextBtn.disabled = !hasMultiple || currentIndex === images.length - 1;
}

function humanType(type) {
  if (type === 'image/jpeg') {
    return 'JPEG';
  }

  return type.replace('image/', '').toUpperCase();
}

render();
