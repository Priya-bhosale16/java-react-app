package com.example.CafeProject.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.CafeProject.Model.MenuItem;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
}
