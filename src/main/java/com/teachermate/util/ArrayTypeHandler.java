package com.teachermate.util;

import org.apache.ibatis.type.*;

import java.sql.*;

@MappedJdbcTypes(JdbcType.VARCHAR)
@MappedTypes(String[].class)
public class ArrayTypeHandler extends BaseTypeHandler<Object[]> {
    private static final String TYPE_NAME_VARCHAR = "varchar";
    private static final String TYPE_NAME_INTEGER = "integer";
    private static final String TYPE_NAME_BOOLEAN = "boolean";
    private static final String TYPE_NAME_NUMERIC = "numeric";

    @Override
    public void setNonNullParameter(PreparedStatement preparedStatement, int parameterIndex, Object[] parameter, JdbcType jdbcType) throws SQLException {
        String typeName = null;
        System.out.println();
        if (parameter instanceof Integer[]) {
            typeName = TYPE_NAME_INTEGER;
        } else if (parameter instanceof String[]) {
            typeName = TYPE_NAME_VARCHAR;
        } else if (parameter instanceof Boolean[]) {
            typeName = TYPE_NAME_BOOLEAN;
        } else if (parameter instanceof Double[]) {
            typeName = TYPE_NAME_NUMERIC;
        }
        if (typeName == null) {
            throw new TypeException("ArrayTypeHandler parameter typeName error, your type is " + parameter.getClass().getName());
        }
        System.out.println("------");
        for (Object o : parameter){
            System.out.println(o.toString());
        }
        System.out.println("------");
        Connection connection = preparedStatement.getConnection();
        System.out.println("------");
        Array array = connection.createArrayOf(typeName, parameter);
        System.out.println(array.toString());
        System.out.println("------");
        preparedStatement.setArray(parameterIndex, array);
    }

    @Override
    public Object[] getNullableResult(ResultSet resultSet, String column_name) throws SQLException {
        return getArray(resultSet.getArray(column_name));
    }

    @Override
    public Object[] getNullableResult(ResultSet resultSet, int column_index) throws SQLException {
        return getArray(resultSet.getArray(column_index));
    }

    @Override
    public Object[] getNullableResult(CallableStatement callableStatement, int column_index) throws SQLException {
        return getArray(callableStatement.getArray(column_index));
    }

    private Object[] getArray(Array array) {
        if (array == null) {
            return null;
        }
        try {
            return (Object[]) array.getArray();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
