import { FullConfig,request as APIRequest, APIRequestContext } from "@playwright/test";

// Defining type for test data to avoid typescript error
interface ImageData {
    title: string;
    image: string;
    keywords: string[];
    uploadDate: string;
}

async function globalSetup(config: FullConfig) {
    const { baseURL } = config.projects[0].use;
    const BASE_URL = baseURL ;

    // Create API request context
    const requestContext: APIRequestContext = await APIRequest.newContext({
        baseURL: BASE_URL,
    });

    //  Sample base data for API requests
    const testImage: ImageData = {
        title: "Test Image",
        image: "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
        keywords: ["testdata", "test"],
        uploadDate: "1999-11-02T16:11:05.095Z"
    };

    //  Test data variations
    const testImages: ImageData[] = [
        { ...testImage, title: "123", keywords: ["number"] },  // Image with numeric title
        { ...testImage, title: "@#$", keywords: ["special"] },  // Image with special characters
        { ...testImage, title: "banana", keywords: ["fruit", "yellow"], uploadDate: "2025-01-01T16:11:05.095Z" } // Future date
    ];

    // Function to send API requests safely
    async function addTestData(imageData: ImageData) {
        try {
            const response = await requestContext.post('/api/images', { data: imageData });

            if (response.status() === 201) {
                console.log(` Test data added: ${imageData.title}`);
            } else {
                console.error(`Failed to add test data: ${imageData.title} (Status: ${response.status()})`, await response.text());
            }
        } catch (error) {
            console.error(` Error while adding test data: ${imageData.title}`, error);
        }
    }

    //  Run all API requests in parallel 
    await Promise.all(testImages.map(addTestData));

    await requestContext.dispose(); // Cleanup request context

    console.log(" Global setup completed.\n");
}

export default globalSetup;
