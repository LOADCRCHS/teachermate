package com.teachermate.service.impl;

import com.teachermate.dao.SignDao;
import com.teachermate.pojo.Sign;
import com.teachermate.service.SignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class SignServiceImpl implements SignService {
    @Autowired
    public SignDao signDao;

    @Override
    public Sign create(boolean is_gps) {
        Sign sign = new Sign();
        sign.setDate(new Date());
        sign.setGps(is_gps);
        signDao.create(sign);
        return sign;
    }

    @Override
    public void update(Sign sign) {
        signDao.update(sign);
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
