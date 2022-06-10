import axios from 'axios'

const fetchAllEquipment = async () => { 
  return await axios({
    method: 'get',
    url: 'http://localhost:1337/api/equipments?populate=equipment_type',
  });
}

const createEquipment = async (data) => { 
  const { type: equipment_type, ...itemData } = data

  return await axios({
    method: 'post',
    url: 'http://localhost:1337/api/equipments',
    data: {
      data: { equipment_type, ...itemData }
    }
  });
}

const updateEquipment = async (data) => { 
  const { id, type: equipment_type, ...itemData } = data
  
  return await axios({
    method: 'put',
    url: `http://localhost:1337/api/equipments/${id}`,
    data: {
      data: { equipment_type, ...itemData }
    }
  });
}

const deleteEquipment = async (id) => { 
  return await axios({
    method: 'delete',
    url: `http://localhost:1337/api/equipments/${id}`
  });
}

const searchEquipment = async (query) => { 
  return await axios({
    method: 'get',
    url: `http://localhost:1337/api/equipments?populate=equipment_type&filters[$or][0][sn][$contains]=${query}&filters[$or][1][note][$contains]=${query}`,
  });
}

export {
  fetchAllEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  searchEquipment
}