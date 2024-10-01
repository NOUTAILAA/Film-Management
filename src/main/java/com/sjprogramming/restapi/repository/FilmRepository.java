package com.sjprogramming.restapi.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.sjprogramming.restapi.entity.Film;

public interface FilmRepository extends JpaRepository<Film, Long> {
}
