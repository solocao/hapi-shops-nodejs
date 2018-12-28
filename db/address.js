// 引入 models
const models = require('../models');
const code = require('../lib/code');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/**
 * 添加或者更新收获地址
 * @param {*} parms
 */

saveAction = async (parms) => {
  try{
    // var addressId = parms.body.addressId;
    // const {
    //   userName,
    //   telNumber,
    //   address,
    //   detailadress,
    //   checked,
    //   openId
    // } = parms.body;
    /**
     * 如果是默认选中，
     * 先在数据库查询是否默认地址
     */
      const isDefault = await models.nideshop_address.findAndCountAll({
        where: {
          user_id: parms.openId,
          is_default: 1
        }
      });
      if (isDefault.length > 0) {
        const data = await models.nideshop_address.findAndCountAll({
          where: {
            user_id: parms.openId,
            is_default: 1
          }
        }).update(parms,{
          where: {
             name: parms.userName,
              mobile: parms.telNumber,
              address: parms.address,
              address_detail: parms.detailadress,
              user_id: parms.openId,
              is_default: parms.checked == "true" || parms.checked ? 1 : 0
          }
        });
        console.log(data);
        if (data) {
          return {
            results: {
              data: true,
            },
            dataBaseError: false
          };
        } else {
          return {
            results: {
              data: false,
            },
          };
        }
      } else {
        const data = await models.nideshop_address.create({
          name: parms.userName,
          mobile: parms.telNumber,
          address: parms.address,
          address_detail: parms.detailadress,
          user_id: parms.openId,
          is_default: parms.checked == "true" || parms.checked ? 1 : 0
        });
        console.log(data);
        if (data) {
          return {
            results: {
              data: true
            },
            dataBaseError: false
          }
        } else {
          return {
            results: {
              data: false,
            },
            dataBaseError: false
          }
        }
      }
  }
  catch(e) {
    return { results: e, dataBaseError: true}
  }
}


module.exports = {
  saveAction,
}