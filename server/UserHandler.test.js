const axios = require('axios');
const myModule = require('./UserHandler');

// Mock API_BASE_URL
jest.mock('../Constants', () => ({
  API_BASE_URL: 'https://raw.githubusercontent.com/alj-devops/santa-data/master'
}));

jest.mock('axios');

const usersResp = {data:[{
    "username": "charlie.brown",
    "uid": "730b0412-72c7-11e9-a923-1681be663d3e"
  },
  {
    "username": "james.bond",
    "uid": "730b06a6-72c7-11e9-a923-1681be663d3e"
  },
  {
    "username": "bugs.bunny",
    "uid": "730b0804-72c7-11e9-a923-1681be663d3e"
  }]}

const userDetailsResp = {
    data:[{
        "userUid": "730b0412-72c7-11e9-a923-1681be663d3e",
        "address": "219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo",
        "birthdate": "2017/12/05"
      },
      {
        "userUid": "730b06a6-72c7-11e9-a923-1681be663d3e",
        "address": "365-1095, Minowada, Shirataka-machi Nishiokitama-gun, Yamagata",
        "birthdate": "1987/01/01"
      },
      {
        "userUid": "730b0804-72c7-11e9-a923-1681be663d3e",
        "address": "292-1082, Yodacho, Obihiro-shi, Hokkaido",
        "birthdate": "2010/23/01"
      }]
}

describe('myModule', () => {
    afterEach(() => {
        jest.clearAllMocks();
      });
    
  describe('fetchUsers', () => {
    it('should fetch users data successfully', async () => {
      const mockResponse = usersResp;
      axios.get.mockResolvedValue(mockResponse);

      const users = await myModule.fetchUsers();

      expect(users).toEqual(mockResponse.data);
    });
  });

  describe('checkIfUserExists', () => {
    it('should return the user object if user exists', async () => {
      const mockUsers = usersResp;
      myModule.fetchUsers = jest.fn().mockResolvedValue(mockUsers.data);

      const user = await myModule.checkIfUserExists('james.bond');

      expect(user.username).toEqual('james.bond');
    });

    it('should return null if user does not exist', async () => {
      const mockUsers = usersResp.data;
      myModule.fetchUsers = jest.fn().mockResolvedValue(mockUsers);

      const user = await myModule.checkIfUserExists(3);
      var res = false
      if(user) res = true
      expect(false).toEqual(res);
    });
  });

  describe('getAllUsersDetails', () => {
    it('should fetch user profiles data successfully', async () => {
      const mockResponse = { data: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }] };
      axios.get.mockResolvedValue(mockResponse);

      const userProfiles = await myModule.getAllUsersDetails();

      expect(userProfiles).toEqual(mockResponse.data);
    });

    it('should handle errors while fetching user profiles data', async () => {
      const mockError = new Error('Failed to fetch user profiles');
      axios.get.mockRejectedValue(mockError);

      const userProfiles = await myModule.getAllUsersDetails();

      expect(userProfiles).toBeNull();
      expect(console.log).toHaveBeenCalledWith('Error:', mockError);
    });
  });

  describe('getUserDetails', () => {
    it('should return the user details if user exists', async () => {
      const mockUserDetails = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
      myModule.getAllUsersDetails = jest.fn().mockResolvedValue(mockUserDetails);

      const userDetails = await myModule.getUserDetails(1);

      expect(userDetails).toEqual(mockUserDetails[0]);
    });

    it('should return null if user details do not exist', async () => {
      const mockUserDetails = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
      myModule.getAllUsersDetails = jest.fn().mockResolvedValue(mockUserDetails);

      const userDetails = await myModule.getUserDetails(3);

      expect(userDetails).toBeNull();
    });
  });

  describe('isUserUnderAge', () => {
    it('should return "underAge" if user is under the age limit', async () => {
      const mockUser = { uid: 1 };
      myModule.getUserDetails = jest.fn().mockResolvedValue({ birthdate: '1990/01/01' });
      myModule.calculateAge = jest.fn().mockResolvedValue(32);

      const result = await myModule.isUserUnderAge(mockUser, 18);

      expect(result).toEqual('underAge');
    });

    it('should return "overAge" if user is over the age limit', async () => {
      const mockUser = { uid: 1 };
      myModule.getUserDetails = jest.fn().mockResolvedValue({ birthdate: '1980/01/01' });
      myModule.calculateAge = jest.fn().mockResolvedValue(42);

      const result = await myModule.isUserUnderAge(mockUser, 18);

      expect(result).toEqual('overAge');
    });
  });

  describe('calculateAge', () => {
    it('should calculate the age correctly', async () => {
      const birthDateString = '1990/01/01';

      const age = await myModule.calculateAge(birthDateString);

      expect(age).toBe(32);
    });
  });
});