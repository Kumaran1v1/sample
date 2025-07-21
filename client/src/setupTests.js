// Jest setup file for testing environment

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock window.ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock window.IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock HTMLCanvasElement.getContext
HTMLCanvasElement.prototype.getContext = jest.fn();

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mocked-url');

// Mock performance.now
global.performance.now = jest.fn(() => Date.now());

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  // Uncomment to ignore specific console methods
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.sessionStorage = sessionStorageMock;

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
  })
);

// Mock file reader
global.FileReader = jest.fn(() => ({
  readAsDataURL: jest.fn(),
  readAsText: jest.fn(),
  onload: jest.fn(),
  onerror: jest.fn(),
  result: 'mocked-result',
}));

// Mock CSS animations
const mockAnimations = {
  animate: jest.fn(() => ({
    finished: Promise.resolve(),
    cancel: jest.fn(),
    pause: jest.fn(),
    play: jest.fn(),
  })),
};

Element.prototype.animate = mockAnimations.animate;

// Mock getBoundingClientRect
Element.prototype.getBoundingClientRect = jest.fn(() => ({
  width: 120,
  height: 120,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  x: 0,
  y: 0,
  toJSON: jest.fn(),
}));

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

// Mock focus and blur
Element.prototype.focus = jest.fn();
Element.prototype.blur = jest.fn();

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
    readText: jest.fn(() => Promise.resolve('')),
  },
});

// Mock drag and drop
const mockDataTransfer = {
  dropEffect: 'none',
  effectAllowed: 'uninitialized',
  files: [],
  items: [],
  types: [],
  clearData: jest.fn(),
  getData: jest.fn(),
  setData: jest.fn(),
  setDragImage: jest.fn(),
};

global.DataTransfer = jest.fn(() => mockDataTransfer);

// Mock touch events
global.TouchEvent = jest.fn();
global.Touch = jest.fn();

// Setup global test utilities
global.testUtils = {
  // Helper to create mock events
  createMockEvent: (type, properties = {}) => ({
    type,
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    target: { value: '' },
    currentTarget: { value: '' },
    ...properties,
  }),
  
  // Helper to create mock mouse events
  createMockMouseEvent: (type, properties = {}) => ({
    type,
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    clientX: 0,
    clientY: 0,
    button: 0,
    buttons: 1,
    ...properties,
  }),
  
  // Helper to create mock keyboard events
  createMockKeyboardEvent: (type, properties = {}) => ({
    type,
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    key: '',
    code: '',
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    metaKey: false,
    ...properties,
  }),
};

// Increase timeout for async tests
jest.setTimeout(10000);
