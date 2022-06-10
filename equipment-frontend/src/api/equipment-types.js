import axios from 'axios'

const fetchEquipmentTypes = async () => { 
  return await axios({
    method: 'get',
    url: 'http://localhost:1337/api/equipment-types',
  });
}

const createEquipmentType = async (data) => { 
  return await axios({
    method: 'post',
    url: 'http://localhost:1337/api/equipment-types',
    data: {
      data: { ...data }
    }
  });
}

const updateEquipmentType = async (data) => { 
  const { id, ...itemData } = data
  
  return await axios({
    method: 'put',
    url: `http://localhost:1337/api/equipment-types/${id}`,
    data: {
      data: itemData
    }
  });
}

const deleteEquipmentType = async (id) => { 
  return await axios({
    method: 'delete',
    url: `http://localhost:1337/api/equipment-types/${id}`
  });
}


export {
  fetchEquipmentTypes,
  createEquipmentType,
  updateEquipmentType,
  deleteEquipmentType
}