using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System.Collections.Generic;
using System.Linq;

namespace EmployeeTimesheet.Helpers
{
    [HtmlTargetElement("span", Attributes = "lookup-for,select-list")]
    public class LookUpTagHelper : TagHelper
    {
        [HtmlAttributeName("select-list")]
        public IEnumerable<SelectListItem> list { get; set; }

        [HtmlAttributeName("lookup-for")]
        public ModelExpression LookupFor { get; set; }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            if(output.TagName == "span")
            {
                output.TagMode = TagMode.StartTagAndEndTag;

                string modelValue = LookupFor.Model.ToString();
                string lookup = list.Where(l => l.Value == modelValue).Select(l => l.Text).FirstOrDefault();
                output.Content.Append(lookup);
                
            }
        }
    }
}
