package com.example.CafeProject.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.CafeProject.Model.MenuItem;
import com.example.CafeProject.Repository.MenuItemRepository;

@Service
public class MenuService {
	 private final MenuItemRepository menuRepo;

	    public MenuService(MenuItemRepository menuRepo) {
	        this.menuRepo = menuRepo;
	    }

	    public List<MenuItem> getAllItems() {
	        return menuRepo.findAll();
	    }

	    public MenuItem save(MenuItem item) {
	        return menuRepo.save(item);
	    }
	    public void deleteById(Long id) {
	        menuRepo.deleteById(id);
	    }
	    public MenuItem getById(Long id) {
	        return menuRepo.findById(id)
	                       .orElseThrow(() -> new RuntimeException("Item not found"));
	    }


}
