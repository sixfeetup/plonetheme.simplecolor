""" 
Python module that when called recursively returns all published documents in that context
Joe DeLuca - jdeluca@ist.psu.edu 9/26/2008 
"""
from Products.CMFCore.utils import getToolByName

#create the empty list
docList = []
#the main function which will call the others and return the list of document ids
def getAllItems():
	items = context.getFolderContents()
	for item in items:
		if getattr(item, 'portal_type', None) == "Folder":
			thisFolder = item.getObject()
			dealWithFolder(thisFolder)
		elif getattr(item , 'portal_type', None) == "lessonpage":
			thisDoc = item.getObject()
			appendDocument(thisDoc)
	return docList
	
# get the folder contents - if folder return to itself, if document, hand off to 
# appendDocument						
def dealWithFolder(thisFolder):				
		
	folderItems = thisFolder.getFolderContents()
	for folderItem in folderItems:
		if getattr(folderItem, 'portal_type', None) == "Folder":
			currentFolder = folderItem.getObject()
			dealWithFolder(currentFolder)
		elif getattr(folderItem , 'portal_type', None) == "Document":
			thisDoc = folderItem.getObject()
			appendDocument(thisDoc)
		

#add the document id to the list if the workflow state is set to published			
def appendDocument(docId):
	wf_tool = getToolByName(docId, 'portal_workflow')
	current_state = wf_tool.getInfoFor(docId, "review_state")
	if current_state == "published":
		docList.append(docId)

return getAllItems()
