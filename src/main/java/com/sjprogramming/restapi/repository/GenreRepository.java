package com.sjprogramming.restapi.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.sjprogramming.restapi.entity.Genre;

public interface GenreRepository extends JpaRepository<Genre, Long> {
}
