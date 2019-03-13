package com.teachermate.pojo;

import lombok.Data;

import java.util.List;

@Data
public class StudentInfoConstraints {
    private boolean notAnonymous;
    private List<List<Constraints>> constraints;
}
