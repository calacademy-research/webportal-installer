/* Copyright (C) 2020, Specify Collections Consortium
 * 
 * Specify Collections Consortium, Biodiversity Institute, University of Kansas,
 * 1345 Jayhawk Boulevard, Lawrence, Kansas, 66045, USA, support@specifysoftware.org
 * 
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/
Ext.define('SpWebPortal.controller.ExpressSearch', {
    extend: 'SpWebPortal.controller.Search',
    
    refs: [
	{
	    ref: 'search',
	    selector: 'expressSrch'
	}
    ],

    stores: ['MainSolrStore'],
    models: ['MainModel'],

    init: function() {
	//console.info("ExpressSearch.init");

	this.control({
	    'expressSrch button[itemid="search-btn"]': {
		click: this.doSearch
	    },
	    'expressSrch radiogroup[itemid="match-radio-grp"]': {
		change: this.matchAllChange
	    },
	    'expressSrch textfield': {
		specialkey: this.onSpecialKey
	    },
	    'button[itemid="mapsearchbtn"]': {
		click: this.onMapSearchClick
	    }
	});
	this.callParent(arguments);
    },

    onMapSearchClick: function() {
	if (!Ext.getCmp('spwpmainexpresssrch').getCollapsed()) {
	    this.setForceFitToMap(true);
	    this.doSearch();
	    this.setForceFitToMap(false);
	}
    },

    doSearch: function(exportSrc) {
	//console.info("ExpressSearch doSearch()");

        if (this.getWriteToCsv() && "adv" == exportSrc) {
            return;
        }
        
	var search = this.getSearch();
	var control = search.query('textfield[itemid="search-text"]');
	var solr = this.getMainSolrStoreStore();
	var images = this.getRequireImages();
	var maps = this.getRequireGeoCoords();
        var srchTerm = this.getSrchTerm(control);
        var mainQ = this.getSrchQuery(srchTerm, this.getMatchAll(), "contents");
            
	var filterToMap = (this.getForceFitToMap() || this.getFitToMap()) && (this.mapViewIsActive() || this.getWriteToCsv());
        var dummy_geocoords;

        //if not JSON queries
        //var url = solr.getSearchUrl(images, maps, mainQ, filterToMap, this.getMatchAll(), dummy_geocoords, this.getWriteToCsv());
        //
        
        this.adjustFitToMapStuff();
        Ext.apply(Ext.getCmp('spwpexpcsvbtn'), {srch: 'expr'});
        var srchObj = solr.getSearchSpecs4J(images, maps, mainQ, filterToMap, this.getMatchAll(), dummy_geocoords, this.getWriteToCsv());
			//select?indent=on&version=2.2&fq=&rows=50&fl=*%2Cscore&qt=&wt=json&explainOther=&hl.fl=&q=
			// query: contents:iris
        if (this.getWriteToCsv()) {
            //if not JSON
            //this.exportToCsv(url, this.getCsvFileName(mainQ));
            //else
            this.exportToCsv(srchObj.url, this.getCsvFileName(srchTerm), srchObj.query);
            //
        } else {
            //if not JSON queries
            //solr.getProxy().url = url;
            //else
            solr.getProxy().url = srchObj.url;
            solr.getProxy().qparams =  {query: srchObj.query};
            //
            solr.setSearched(true);
	    solr.loadPage(1);
	    this.searchLaunched();
        }
    }
});

