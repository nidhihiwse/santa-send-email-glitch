const axios = require('axios');
const myModule = require('./UserHandler');

// Mock API_BASE_URL
jest.mock('./Constants', () => ({
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
  });

  describe('getUserDetails', () => {
    it('should return the user details if user exists', async () => {
      const mockUserDetails = userDetailsResp.data;
      myModule.getAllUsersDetails = jest.fn().mockResolvedValue(mockUserDetails);

      const userDetails = await myModule.getUserDetails("730b0412-72c7-11e9-a923-1681be663d3e");

      expect(userDetails).toEqual(mockUserDetails[0]);
    });

    it('should return null if user details do not exist', async () => {
      const mockUserDetails = userDetailsResp.data;
      myModule.getAllUsersDetails = jest.fn().mockResolvedValue(mockUserDetails);

      const userDetails = await myModule.getUserDetails(3);
      var res = false
      if(userDetails) res = true
      expect(false).toEqual(res);
    });
  });

  describe('calculateAge', () => {
    it('should calculate the age correctly', async () => {
      const birthDateString = '1990/01/01';

      const age = await myModule.calculateAge(birthDateString);

      expect(age).toBe(33);
    });
  });
});