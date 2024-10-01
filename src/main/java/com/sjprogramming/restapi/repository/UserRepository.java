package com.sjprogramming.restapi.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.sjprogramming.restapi.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmailAndPassword(String email, String password);

}

