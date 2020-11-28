import {_loadDoor, _loadTag} from '../Functions/functionListePorte'

const axios = require('axios');
jest.mock('axios');


describe('getTag', () => {
 it('return correct tags by user', async () => {
    axios.get.mockResolvedValue({
      data: [{"tag":"Salon"}]
    });
    const firstTag = await _loadTag(33);
    expect(firstTag).toEqual("Salon");
  });

//test .catch
  it('detect when an error occured', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
    const erreur = await _loadTag(33)
    expect(erreur).rejects.toThrow(errorMessage);
  })
})

  it('return correct doors by tag and by user', async () => {
    axios.get.mockResolvedValue({
      data: [{"door":6,"users":33,"tag":"test","nickname":"maman"}]
    });
    const firstDoor = await _loadDoor("test", 33);
    expect(firstDoor).toEqual("maman");
  });
