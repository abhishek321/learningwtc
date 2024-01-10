const {createBook, updateBook, getBooks} = require("../contollers/books");
const bookModel = require("../models/book");
jest.mock("../models/book");
describe('Book Controller Tests', () => {
    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
    });
 test("bookCreate Successfully book created", async ()=>{
   const mockBookDetail = {name:"Math",description:"Match created",price:10.23,category_id:"dbfjsdfjsdfjdfsdf"};
   bookModel.mockImplementation({
    save: jest.fn().mockResolvedValue(mockBookDetail)
   });
   const req={
    body:mockBookDetail
   }
   const res = {
    status:jest.fn().mockReturnThis(),
    json:jest.fn()
   }
   const next = jest.fn();
   await createBook(req,res,next);
   expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Book added successfully", book: mockBookDetail });
 })
})