package com.teachermate.pojo;

import lombok.Data;

@Data
public class Constraints {
    private int id;
    private String item_comment;
    private int is_required;
    private int value;
    private int label;
    private int rank;
}
