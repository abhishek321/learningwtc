const { createCategory, updateCategory, getCategories } = require('../contollers/category');
const categoryModel = require('../models/category');

jest.mock('../models/category');

describe('Category Controller Tests', () => {
    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
    });

    test('createCategory successfully creates a category', async () => {
        // Your test code here
         // Arrange
    const mockCategoryData = { name: 'Test Category', description: 'Test Description', created_at: new Date() };
    categoryModel.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(mockCategoryData)
    }));

    const req = {
        body: mockCategoryData
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    const next = jest.fn();

    // Act
    await createCategory(req, res, next);
    // Assert
    // console.log("Mock Category Data:", mockCategoryData);
    // console.log("Response status call:", res.status.mock.calls);
    // console.log("Response JSON call:", res.json.mock.calls);
    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Category added successfully", category: mockCategoryData });
    
    });
    test('createCategory handles errors correctly', async () => {
        // Arrange
        const mockError = new Error('Database save error');
        categoryModel.mockImplementation(() => ({
            save: jest.fn().mockRejectedValue(mockError)
        }));
    
        const req = {
            body: { name: 'Test Category', description: 'Test Description', created_at: new Date() }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();
    
        // Act
        await createCategory(req, res, next);
    
        // Assert
        expect(next).toHaveBeenCalledWith(mockError);
    });
    test('updateCategory successfully updated category', async () => {
        // Your test code here
    });
    test('getCategories Successfully getting categories', async () => {
        // Your test code here
    });

    // Add more tests for different scenarios
});

