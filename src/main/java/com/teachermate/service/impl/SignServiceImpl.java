package com.teachermate.service.impl;

import com.teachermate.dao.SignDao;
import com.teachermate.pojo.Sign;
import com.teachermate.service.SignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SignServiceImpl implements SignService {
    @Autowired
    public SignDao signDao;

    @Override
    public Map<String, Object> open_sign(boolean is_gps) {
        Map<String, Object> result = new HashMap<>();
        Sign sign = new Sign();
        sign.setGps(is_gps);
        sign.setId(signDao.create(sign));
        result.put("sign", sign);
        return result;
    }

    @Override
    public void delete(Integer id) {
        signDao.delete(id);
    }

    @Override
    public void close(Integer id) {
        signDao.close(id);
    }

    @Override
    public Sign select_one(Integer id) {
        return signDao.select_one(id);
    }

    @Override
    public List<Sign> select_list() {
        return signDao.select_list();
    }

    @Override
    public List<Sign> select(Sign sign) {
        return signDao.select(sign);
    }
}
