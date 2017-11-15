/*
 * #%L
 * ImageJ server for RESTful access to ImageJ.
 * %%
 * Copyright (C) 2013 - 2016 Board of Regents of the University of
 * Wisconsin-Madison.
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * #L%
 */

package net.imagej.server.resources;

import java.awt.Menu;
import java.awt.MenuBar;
import java.awt.MenuItem;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import com.fasterxml.jackson.core.JsonProcessingException;

import io.dropwizard.setup.Environment;
import net.imagej.legacy.IJ1Helper;
import net.imagej.legacy.LegacyService;
import net.imagej.server.services.JsonService;

/**
 * Resource for administration.
 * 
 * @author Leon Yang
 */
@Path("/admin")
public class AdminResource {

	@Inject
	private LegacyService legacyService;
	
	@Inject
	private JsonService jsonService;
	
	@Inject
	private Environment env;	
	
	@GET
	@Path("menu")
	public String menu() throws JsonProcessingException {
		IJ1Helper helper = legacyService.getIJ1Helper(); 
		MenuBar menuBar = helper.getMenuBar();
		
		Map<String,Object> map = new LinkedHashMap<>();
		
		for (int it = 0; it < menuBar.getMenuCount(); it++) {
			map.put(menuBar.getMenu(it).getLabel(),getMenuRecursively(menuBar.getMenu(it)));
		}
		
		return jsonService.parseObject(map);
	}
	
	private Map<String, Object> getMenuRecursively( Menu menu) {
		Map<String, Object> result = new LinkedHashMap<>();
		for (int it = 0; it < menu.getItemCount(); it++) {
			MenuItem menuItem = menu.getItem(it);
			if (menuItem instanceof Menu) {
				result.put(menuItem.getLabel(),getMenuRecursively((Menu)menuItem));
			}
			else {
				result.put(menuItem.getLabel(), Collections.emptyMap());
			}
		}
		return result;
	}

	/**
	 * Stop the imagej-server.
	 * 
	 * @return always OK
	 */
	@Path("stop")
	@DELETE
	public Response stop() {
		// stop the server in a separate thread in case the server hangs waiting for
		// the current thread.
		final Thread thread = new Thread(new Runnable() {

			@Override
			public void run() {
				try {
					env.getApplicationContext().getServer().stop();
				}
				catch (Exception exc) {}
			}
		});
		try {
			return Response.ok().build();
		}
		finally {
			thread.start();
		}
	}

}
