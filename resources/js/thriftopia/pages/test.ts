import axios from 'axios';

// Test homepage data loading
async function testHomePage() {
    try {
        const response = await axios.get('/');
        console.log('Homepage Response:', response.data);
        
        // Check if required data exists
        if (!response.data.props.banners) {
            console.error('Missing banners data');
        }
        if (!response.data.props.categories) {
            console.error('Missing categories data');
        }
        if (!response.data.props.products) {
            console.error('Missing products data');
        }
        
        return response.data;
    } catch (error) {
        console.error('Homepage loading failed:', error);
        throw error;
    }
}

// Test Midtrans configuration
function testMidtransConfig() {
    if (typeof window.snap === 'undefined') {
        console.error('Midtrans Snap is not loaded');
        return false;
    }
    return true;
}

// Run tests
async function runTests() {
    console.log('Running tests...');
    
    try {
        await testHomePage();
        console.log('Homepage data test: PASSED');
    } catch (error) {
        console.log('Homepage data test: FAILED');
    }
    
    if (testMidtransConfig()) {
        console.log('Midtrans configuration test: PASSED');
    } else {
        console.log('Midtrans configuration test: FAILED');
    }
}

// Run tests when page loads
window.addEventListener('load', runTests);
