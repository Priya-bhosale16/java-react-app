package com.example.CafeProject.Controller;

import com.example.CafeProject.Model.MenuItem;
import com.example.CafeProject.Service.MenuService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "http://localhost:3000") // CORS enabled
public class MenuController {

	
	private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping
    public List<MenuItem> getMenu() {
        return menuService.getAllItems();
    }

    @PostMapping
    public MenuItem addMenuItem(@RequestBody MenuItem item) {
        return menuService.save(item);
    }
    
    @DeleteMapping("/{id}")
    public void deleteMenuItem(@PathVariable Long id) {
        menuService.deleteById(id);
    }
    
    @PutMapping("/{id}")
    public MenuItem updateMenuItem(@PathVariable Long id, @RequestBody MenuItem updatedItem) {
        MenuItem item = menuService.getById(id);
        item.setName(updatedItem.getName());
        item.setCategory(updatedItem.getCategory());
        item.setPrice(updatedItem.getPrice());
        return menuService.save(item);
    }

}
