import {loadDoors} from '../Functions/functionsPorteFavorite'

const axios = require('axios');
jest.mock('axios');

describe('getDoors', () => {
    it('return correct Doors information by user', async () => {
       axios.get.mockResolvedValue({
         data: [{"id":1,"nickname":"Casa","tag":"LLN","status":1,"adresseip":"192.168.1.60"}]
       });
       const Doors = await loadDoors();
       expect(Doors).toEqual("Casa");
     });
   
   //test .catch
     it('detect when an error occured', async () => {
       const errorMessage = 'Network Error';
       axios.get.mockImplementationOnce(() =>
         Promise.reject(new Error(errorMessage)),
       );
       const tagError = await loadDoors(33)
       expect(tagError).toEqual(errorMessage)
     })
   })