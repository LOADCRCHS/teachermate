package com.teachermate.pojo;

import lombok.Data;

import java.util.List;

@Data
public class SignInfo {
    private String date;
    private String sum;
    private List<SignInfoDetail> details;
    //private boolean isWx;

}
